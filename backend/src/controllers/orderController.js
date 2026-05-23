import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod, orderItems: clientItems } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Shipping address and payment method required' });
    }

    let orderItems = [];
    let itemsPrice = 0;

    if (clientItems && clientItems.length > 0) {
      // ── Frontend sent items directly (Checkout.jsx flow) ──
      orderItems = clientItems.map(item => ({
        product:  item.product,
        name:     item.name,
        image:    item.image,
        price:    item.price,
        qty:      item.qty || item.quantity,
      }));
      itemsPrice = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    } else {
      // ── Fallback: read from DB cart ──
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
      orderItems = cart.items.map(item => ({
        product: item.product._id,
        name:    item.product.name,
        image:   item.product.image,
        price:   item.price,
        qty:     item.quantity,
      }));
      itemsPrice = cart.subtotal;
    }

    const shippingPrice = itemsPrice > 75 ? 0 : 9.95;
    const taxPrice      = Math.round(itemsPrice * 0.1 * 100) / 100;
    const totalPrice    = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;

    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    await order.save();

    // Decrement stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { countInStock: -(item.qty || item.quantity || 1) } }
      );
    }

    // Clear DB cart if it exists
    try {
      const cart = await Cart.findOne({ user: userId });
      if (cart) {
        cart.items = [];
        cart.subtotal = 0;
        cart.tax = 0;
        cart.total = 0;
        await cart.save();
      }
    } catch (_) {}

    // Send confirmation email (non-blocking)
    try {
      const user = await User.findById(userId);
      await sendOrderConfirmationEmail(user.email, order._id, order.totalPrice);
    } catch (emailError) {
      console.error('Order confirmation email failed:', emailError.message);
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('ORDER ERROR:', error.message);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('orderItems.product', 'name image price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.product', 'name image price description');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user._id.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, isPaid, isDelivered } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      order.paidAt = isPaid ? new Date() : undefined;
    }
    if (isDelivered !== undefined) {
      order.isDelivered = isDelivered;
      order.deliveredAt = isDelivered ? new Date() : undefined;
    }

    await order.save();
    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (['Shipped', 'Delivered'].includes(order.orderStatus)) {
      return res.status(400).json({ message: 'Cannot cancel shipped or delivered orders' });
    }
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: item.qty } });
    }
    order.orderStatus = 'Cancelled';
    await order.save();
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, orderStatus } = req.query;
    let filter = {};
    if (orderStatus) filter.orderStatus = orderStatus;
    const pageNum  = parseInt(page)  || 1;
    const limitNum = parseInt(limit) || 10;
    const skip     = (pageNum - 1) * limitNum;
    const orders   = await Order.find(filter)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name image')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });
    const total = await Order.countDocuments(filter);
    res.json({ orders, total, pages: Math.ceil(total / limitNum), currentPage: pageNum });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};