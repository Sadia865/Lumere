import dotenv from 'dotenv';
dotenv.config(); // ← MUST be first before any other imports

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import passport from './config/passport.js';
import wishlistRoutes from './routes/wishlist.js';   // ← add after other imports

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

app.use(cors({
  origin: [
    'https://lumiere-skins.vercel.app',
    'https://lumere-xi31.vercel.app',
    process.env.FRONTEND_URL,
    'http://localhost:5173',
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: '🌿 Lumière Beauty API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      users: '/api/users',
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);             

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌿 Lumière API running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🖼️  Static images: http://localhost:${PORT}/images/`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`); // ← add this to verify
});

export default app;