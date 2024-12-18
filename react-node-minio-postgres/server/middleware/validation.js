import { validateEmail, validatePassword } from '../utils/validation.js';

export const validateUserRegistration = (req, res, next) => {
  const { email, password, name } = req.body;
  const errors = [];

  if (!email || !validateEmail(email)) {
    errors.push('Invalid email address');
  }

  if (!password || !validatePassword(password)) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};