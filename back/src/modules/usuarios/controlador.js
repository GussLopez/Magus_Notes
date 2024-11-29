import bcrypt from 'bcrypt';
import { agregar, uno, actualizar, eliminar, query } from '../../db/mysql.js';

const TABLA = 'usuarios';

export async function crearUsuario(usuario) {
  const { nombre, apellido, correo, telefono, password } = usuario;

  const [existingUser] = await query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const usuarioData = {
    nombre,
    apellido,
    correo,
    telefono,
    password: hashedPassword
  };

  const result = await agregar(TABLA, usuarioData);
  delete result.password;
  return result;
}

export async function obtenerUsuario(id) {
  const [usuario] = await uno(TABLA, id);
  if (usuario) {
    delete usuario.password;
  }
  return usuario;
}

export async function actualizarUsuario(id, usuario) {
  const { nombre, apellido, correo, telefono, password } = usuario;
  const usuarioData = {
    nombre,
    apellido,
    correo,
    telefono
  };
  
  if (password) {
    const saltRounds = 10;
    usuarioData.password = await bcrypt.hash(password, saltRounds);
  }
  
  const result = await actualizar(TABLA, id, usuarioData);
  delete result.password;
  return result;
}

export async function eliminarUsuario(id) {
  const result = await eliminar(TABLA, id);
  return result;
}

