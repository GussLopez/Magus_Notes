import express from 'express';
import { crearNota, obtenerNota, obtenerNotasUsuario, actualizarNota, eliminarNota } from './controlador.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await crearNota(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const nota = await obtenerNota(req.params.id);
    if (nota) {
      res.json(nota);
    } else {
      res.status(404).json({ error: 'Nota no encontrada' });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/usuario/:usuarioId', async (req, res, next) => {
  try {
    const notas = await obtenerNotasUsuario(req.params.usuarioId);
    res.json(notas);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const result = await actualizarNota(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await eliminarNota(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;

