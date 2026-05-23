import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET wishlist
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json({ wishlist: user.wishlist || [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message });
  }
});

// ADD to wishlist
router.post('/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const user = await User.findById(req.user.id);
    if (user.wishlist.includes(productId)) {
      return res.json({ message: 'Already in wishlist', wishlist: user.wishlist });
    }

    user.wishlist.push(productId);
    await user.save();
    await user.populate('wishlist');
    res.json({ message: 'Added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to wishlist', error: error.message });
  }
});

// REMOVE from wishlist
router.delete('/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();
    await user.populate('wishlist');
    res.json({ message: 'Removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from wishlist', error: error.message });
  }
});

// CHECK if in wishlist
router.get('/check/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const inWishlist = user.wishlist.some(id => id.toString() === req.params.productId);
    res.json({ inWishlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to check wishlist', error: error.message });
  }
});

export default router;