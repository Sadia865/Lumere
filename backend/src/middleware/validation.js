// src/middleware/validation.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters, one uppercase, one number
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

export const validateRegisterData = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email, and password are required',
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: 'Invalid email format',
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters with 1 uppercase letter and 1 number',
    });
  }

  next();
};

export const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: 'Invalid email format',
    });
  }

  next();
};