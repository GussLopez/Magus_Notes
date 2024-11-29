import { agregar, uno, actualizar, eliminar, query } from '../../db/mysql.js';

const TABLA = 'notas';

export async function crearNota(nota) {
  const result = await agregar(TABLA, nota);
  return result;
}

export async function obtenerNota(id) {
  const [nota] = await uno(TABLA, id);
  return nota;
}

export async function obtenerNotasUsuario(usuarioId) {
  const notas = await query(`SELECT * FROM ${TABLA} WHERE usuario_id = ?`, [usuarioId]);
  return notas;
}

export async function actualizarNota(id, nota) {
  const result = await actualizar(TABLA, id, nota);
  return result;
}

export async function eliminarNota(id) {
  const result = await eliminar(TABLA, id);
  return result;
}

