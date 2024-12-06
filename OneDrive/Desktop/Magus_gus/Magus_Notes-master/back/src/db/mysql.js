import mysql from 'mysql2/promise';
import config from '../config.js';

const pool = mysql.createPool(config.mysql);

export async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente.');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    return false;
  }
}

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function todos(tabla) {
  return query(`SELECT * FROM ${tabla}`);
}

export async function uno(tabla, id) {
  return query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
}

export async function agregar(tabla, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  const sql = `INSERT INTO ${tabla} (${keys.join(', ')}) VALUES (${placeholders})`;
  const result = await query(sql, values);
  return { ...data, id: result.insertId };
}

export async function actualizar(tabla, id, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE ${tabla} SET ${setClause} WHERE id = ?`;
  await query(sql, [...values, id]);
  return { id, ...data };
}

export async function eliminar(tabla, id) {
  await query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
  return { id };
}

export { query };

