import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors()); // 👈 ESTA LÍNEA ES CLAVE
app.use('/auth', authRoutes);

app.listen(3002, () => {
  console.log('Auth service corriendo en 3002');
});