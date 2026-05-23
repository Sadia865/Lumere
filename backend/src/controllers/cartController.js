import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const calcTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { subtotal, tax, total };
};

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    const { subtotal, tax, total } = calcTotals(cart.items);
    res.json({ ...cart.toObject(), subtotal, tax, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    await cart.save();
    await cart.populate('items.product');
    const { subtotal, tax, total } = calcTotals(cart.items);
    res.json({ message: 'Item added to cart', cart: { ...cart.toObject(), subtotal, tax, total } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart', error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const cartItem = cart.items.find(
      (item) => item.product._id.toString() === productId
    );
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not in cart' });
    }
    if (cartItem.product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    cartItem.quantity = quantity;
    await cart.save();
    const { subtotal, tax, total } = calcTotals(cart.items);
    res.json({ message: 'Cart updated', cart: { ...cart.toObject(), subtotal, tax, total } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== productId
    );
    await cart.save();
    const { subtotal, tax, total } = calcTotals(cart.items);
    res.json({ message: 'Item removed', cart: { ...cart.toObject(), subtotal, tax, total } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from cart', error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared', cart: { ...cart.toObject(), subtotal: 0, tax: 0, total: 0 } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
};

export const getCartCount = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const count = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get cart count', error: error.message });
  }
};