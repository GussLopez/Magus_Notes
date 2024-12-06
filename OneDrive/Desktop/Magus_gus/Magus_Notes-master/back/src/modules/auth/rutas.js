import express from 'express';
import { login, register, sendResetCode, resetPassword } from './controlador.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const result = await login(correo, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/send-reset-code', async (req, res, next) => {
  try {
    const { correo } = req.body;
    const result = await sendResetCode(correo);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req, res, next) => {
  try {
    const { correo, verificationCode, newPassword } = req.body;
    const result = await resetPassword(correo, verificationCode, newPassword);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;

