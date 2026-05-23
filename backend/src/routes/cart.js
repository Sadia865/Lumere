import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  getCartCount,
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/',              protect, getCart);
router.post('/',             protect, addToCart);      // ✅ changed from /add to /
router.get('/count',         protect, getCartCount);
router.put('/:productId',    protect, updateCartItem);
router.delete('/:productId', protect, removeFromCart);
router.delete('/',           protect, clearCart);

export default router;