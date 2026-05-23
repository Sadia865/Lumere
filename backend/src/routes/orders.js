import express from 'express';
import Stripe from 'stripe';
import {
  createOrder, getOrders, getOrderById,
  cancelOrder, updateOrderStatus, getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router  = express.Router();
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe checkout session
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const { items, shippingAddress, orderId } = req.body;

    const lineItems = items.map(({ name, price, quantity, image }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name,
          images: image?.startsWith('http') ? [image] : [],
        },
        unit_amount: Math.round(price * 100),
      },
      quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url:  `${process.env.FRONTEND_URL}/checkout?cancelled=true`,
      metadata: { orderId: orderId?.toString() || '', userId: req.user.id.toString() },
      shipping_address_collection: { allowed_countries: ['US', 'GB', 'CA', 'AU', 'PK', 'AE', 'QA'] },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Stripe session failed', error: error.message });
  }
});

// Verify payment & update order
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const { sessionId, orderId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const Order = (await import('../models/Order.js')).default;
      const order = await Order.findByIdAndUpdate(
        orderId,
        { isPaid: true, paidAt: new Date(), orderStatus: 'Processing', 'paymentResult.id': session.id, 'paymentResult.status': session.payment_status },
        { new: true }
      );
      res.json({ success: true, order });
    } else {
      res.json({ success: false, message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed', error: error.message });
  }
});

router.post('/',              protect,       createOrder);
router.get('/my-orders',      protect,       getOrders);
router.get('/:id',            protect,       getOrderById);
router.put('/:id/cancel',     protect,       cancelOrder);
router.get('/admin/all',      protect, admin, getAllOrders);
router.put('/:id/status',     protect, admin, updateOrderStatus);

export default router;