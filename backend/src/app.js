import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import wishlistRoutes from './routes/wishlist.js';

const app = express();

/* Middleware */
app.use(cors());

app.use(express.json({
  limit: '10mb',
}));

app.use(express.urlencoded({
  extended: true,
}));

app.use(cookieParser());

app.use(morgan('dev'));

/* Health Route */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Lumière API Running',
  });
});

/* API Routes */
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);

/* 404 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

export default app;