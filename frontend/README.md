# Lumière Beauty Backend 🌿

A complete, production-ready MERN backend for the Lumière Beauty e-commerce platform.

## 📋 Features

✅ User Authentication & Authorization (JWT)
✅ Product Management with Filtering & Pagination  
✅ Shopping Cart System
✅ Order Management
✅ Email Notifications
✅ User Profiles
✅ Admin Dashboard Support
✅ MongoDB with Mongoose ODM
✅ Error Handling Middleware
✅ CORS & Security Headers
✅ Password Reset Flow
✅ Product Reviews & Ratings

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (Atlas or local)
- Git

### Installation

1. **Clone or download the backend files**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
# Required:
# - MONGODB_URI (from MongoDB Atlas)
# - JWT_SECRET (generate a secure random string)
# - JWT_REFRESH_SECRET (generate another secure random string)
# - EMAIL_USER & EMAIL_PASSWORD (Gmail app password)
```

4. **Seed the database (optional)**
```bash
npm run seed
```

5. **Start the server**
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── email.js           # Nodemailer setup
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Product.js         # Product schema
│   │   ├── Cart.js            # Cart schema
│   │   └── Order.js           # Order schema
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── products.js        # Product endpoints
│   │   ├── cart.js            # Cart endpoints
│   │   ├── orders.js          # Order endpoints
│   │   └── users.js           # User endpoints
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── errorHandler.js    # Error handling
│   │   └── validation.js      # Input validation
│   ├── utils/
│   │   ├── generateToken.js   # JWT generation
│   │   └── sendEmail.js       # Email sending
│   ├── seeders/
│   │   └── productSeeder.js   # Database seeding
│   └── server.js              # Express app
├── .env.example
├── .gitignore
└── package.json
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         # Register new user
POST   /api/auth/login            # Login user
POST   /api/auth/logout           # Logout user
GET    /api/auth/me               # Get current user (protected)
PUT    /api/auth/profile          # Update profile (protected)
POST   /api/auth/forgot-password  # Request password reset
POST   /api/auth/reset-password/:token  # Reset password
POST   /api/auth/refresh          # Refresh access token
```

### Products
```
GET    /api/products              # Get all products (with filters)
GET    /api/products/:id          # Get product by ID
GET    /api/products/featured     # Get featured products
POST   /api/products              # Create product (admin)
PUT    /api/products/:id          # Update product (admin)
DELETE /api/products/:id          # Delete product (admin)
POST   /api/products/:id/reviews  # Add review (protected)
```

### Cart
```
GET    /api/cart                  # Get cart (protected)
POST   /api/cart/add              # Add to cart (protected)
PUT    /api/cart/:productId       # Update cart item (protected)
DELETE /api/cart/:productId       # Remove from cart (protected)
DELETE /api/cart                  # Clear cart (protected)
GET    /api/cart/count            # Get cart count (protected)
```

### Orders
```
POST   /api/orders                # Create order (protected)
GET    /api/orders/my-orders      # Get user orders (protected)
GET    /api/orders/:id            # Get order details (protected)
PUT    /api/orders/:id/cancel     # Cancel order (protected)
GET    /api/orders                # Get all orders (admin)
PUT    /api/orders/:id/status     # Update order status (admin)
```

### Users
```
GET    /api/users/profile         # Get user profile (protected)
PUT    /api/users/profile         # Update profile (protected)
PUT    /api/users/change-password # Change password (protected)
DELETE /api/users/account         # Delete account (protected)
GET    /api/users                 # Get all users (admin)
GET    /api/users/:id             # Get user by ID (admin)
PUT    /api/users/:id/role        # Update user role (admin)
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login/Register** → Get `token` and `refreshToken`
2. **Send token** in Authorization header: `Authorization: Bearer <token>`
3. **Token expires** in 24 hours
4. **Use refreshToken** to get new token via `/api/auth/refresh`

Example request header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📧 Email Setup

### Gmail (Recommended for Development)

1. Enable 2-Factor Authentication on your Google Account
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Add to `.env`:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

### Other Email Services
Modify `EMAIL_SERVICE` in `.env` to: `outlook`, `yahoo`, `sendgrid`, etc.

## 🗄️ MongoDB Setup

### Using MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string
4. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lumiere?retryWrites=true&w=majority
```

### Using Local MongoDB

```
MONGODB_URI=mongodb://localhost:27017/lumiere
```

## 🌱 Database Seeding

Add sample products to database:
```bash
npm run seed
```

This will:
- Connect to MongoDB
- Clear existing products
- Insert 8 sample beauty products
- Create indexes

## 🔄 Frontend Integration

Your React frontend should:

1. **Set API base URL** in `src/api/axios.js`:
```javascript
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});
```

2. **Send tokens** in requests:
```javascript
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

3. **Handle token refresh** on 401:
```javascript
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // Call /api/auth/refresh to get new token
      // Update localStorage with new token
    }
    return Promise.reject(error);
  }
);
```

## 🛡️ Security Notes

- ✅ Passwords hashed with bcryptjs
- ✅ JWTs signed with secret keys
- ✅ CORS enabled for frontend
- ✅ Input validation on all endpoints
- ✅ Error messages don't expose sensitive info
- ✅ Protected routes require authentication

For production:
- [ ] Use HTTPS only
- [ ] Add rate limiting
- [ ] Use environment-specific configs
- [ ] Add request logging
- [ ] Set strong JWT secrets
- [ ] Enable MongoDB IP whitelist

## 🧪 Testing the API

Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/):

1. **Register**
```
POST http://localhost:5000/api/auth/register
Body: { name, email, password }
```

2. **Login**
```
POST http://localhost:5000/api/auth/login
Body: { email, password }
Response: { token, refreshToken, user }
```

3. **Get Products**
```
GET http://localhost:5000/api/products?page=1&limit=8
```

4. **Add to Cart** (protected)
```
POST http://localhost:5000/api/cart/add
Headers: Authorization: Bearer <token>
Body: { productId, quantity }
```

## 🚨 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "MONGODB_URI is required"
- Check `.env` file exists
- Verify `MONGODB_URI` is set correctly
- Test connection: `mongo "your-connection-string"`

### "JWT_SECRET is not defined"
- Add to `.env`: `JWT_SECRET=your-secret-key`
- Restart the server

### "Email not sending"
- Verify Gmail app password (not regular password)
- Enable "Less secure app access" if not using 2FA
- Check spam folder

### Port 5000 already in use
```bash
# Kill process using port 5000
# On Windows: netstat -ano | findstr :5000
# On Mac/Linux: lsof -i :5000
```

## 📚 Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework |
| mongoose | MongoDB ODM |
| jsonwebtoken | JWT authentication |
| bcryptjs | Password hashing |
| nodemailer | Email sending |
| cors | Cross-origin support |
| dotenv | Environment variables |

## 📄 License

MIT License - feel free to use this for your projects!

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review error logs in console
3. Verify `.env` configuration
4. Check MongoDB connection

---

**Happy coding! 🚀**