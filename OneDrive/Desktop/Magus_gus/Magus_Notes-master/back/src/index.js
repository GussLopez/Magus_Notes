import app from './app.js';
import config from './config.js';
import { checkDatabaseConnection } from './db/mysql.js';

const port = config.app.port;

async function startServer() {
  try {
    const isDatabaseConnected = await checkDatabaseConnection();
    
    if (isDatabaseConnected) {
      console.log('Conexión a la base de datos establecida correctamente.');
    } else {
      console.error('No se pudo establecer conexión con la base de datos.');
      process.exit(1); // Termina el proceso si no hay conexión a la base de datos
    }

    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();

