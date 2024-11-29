import dotenv from 'dotenv';

dotenv.config();

export default {
  app: {
    port: process.env.PORT || 4000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecreta!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '260904',
    database: process.env.MYSQL_DB || 'magus_notes'
  }
};

