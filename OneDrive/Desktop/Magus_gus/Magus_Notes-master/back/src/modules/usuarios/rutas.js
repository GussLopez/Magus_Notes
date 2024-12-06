import express from 'express';
import { crearUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuario } from './controlador.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await crearUsuario(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await obtenerUsuario(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const result = await actualizarUsuario(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await eliminarUsuario(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;

