import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import { query, agregar } from '../../db/mysql.js';
import config from '../../config.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function login(correo, password) {
  const [usuario] = await query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const passwordMatch = await bcrypt.compare(password, usuario.password);

  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: usuario.id, correo: usuario.correo },
    config.jwt.secret,
    { expiresIn: '1h' }
  );

  delete usuario.password;

  return {
    token,
    usuario
  };
}

export async function register(userData) {
  const { nombre, apellido, correo, telefono, password } = userData;

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

  const result = await agregar('usuarios', usuarioData);
  delete result.password;

  const token = jwt.sign(
    { id: result.id, correo: result.correo },
    config.jwt.secret,
    { expiresIn: '1h' }
  );

  return {
    token,
    usuario: result
  };
}

export async function sendResetCode(correo) {
  try {
    const [usuario] = await query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (!usuario) {
      return { message: 'Si el correo existe, recibirás un código de verificación.' };
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const expirationTime = new Date(Date.now() + 3600000); // 1 hora desde ahora
    await query(
      'UPDATE usuarios SET reset_code = ?, reset_code_expires = ? WHERE correo = ?', 
      [verificationCode, expirationTime, correo]
    );

    try {
      await resend.emails.send({
        from: 'Magus Notes <onboarding@resend.dev>',
        to: correo,
        subject: 'Código de verificación - Magus Notes',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Magus Notes</h1>
            <h2 style="color: #666; text-align: center;">Restablecer Contraseña</h2>
            <p style="font-size: 16px;">Has solicitado restablecer tu contraseña. Tu código de verificación es:</p>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;">
              ${verificationCode}
            </div>
            <p style="font-size: 14px; color: #666;">
              Este código expirará en 1 hora. Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.
            </p>
          </div>
        `
      });

      return { 
        success: true,
        message: 'Código de verificación enviado. Por favor, revisa tu correo.' 
      };
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      throw new Error('Error al enviar el correo electrónico');
    }
  } catch (error) {
    console.error('Error en sendResetCode:', error);
    throw new Error('Error al procesar la solicitud de restablecimiento');
  }
}

export async function resetPassword(correo, verificationCode, newPassword) {
  try {
    const [usuario] = await query(
      'SELECT * FROM usuarios WHERE correo = ? AND reset_code = ? AND reset_code_expires > NOW()',
      [correo, verificationCode]
    );

    if (!usuario) {
      throw new Error('Código de verificación inválido o expirado');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await query(
      'UPDATE usuarios SET password = ?, reset_code = NULL, reset_code_expires = NULL WHERE correo = ?',
      [hashedPassword, correo]
    );

    return { 
      success: true,
      message: 'Contraseña actualizada exitosamente' 
    };
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    throw error;
  }
}

