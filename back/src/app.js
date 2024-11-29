import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/rutas.js';
import errorHandler from './middlewares/errors.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Use the error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting the server:', error);
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

