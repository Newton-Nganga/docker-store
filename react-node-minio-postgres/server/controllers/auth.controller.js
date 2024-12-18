import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';
import * as sessionService from '../services/session.service.js';
import logger from '../config/logger.js';

export const register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    const { token, refreshToken } = await authService.generateTokens(user.id);
    
    res.cookie('token', token, { httpOnly: true });
    res.json({ user, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await authService.login(email, password);
    
    res.cookie('token', token, { httpOnly: true });
    res.json({ user, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    
    res.cookie('token', tokens.token, { httpOnly: true });
    res.json({ refreshToken: tokens.refreshToken });
  } catch (error) {
    next(error);
  }
};