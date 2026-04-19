import jwt from 'jsonwebtoken';
import { authenticate } from '../services/ldap.service.js';

const SECRET = 'secreto123';

export const login = async (req, res) => {
  const { user, password } = req.body;

  try {
    // 🔥 1. VALIDAR EN LDAP
    await authenticate(user, password);

    // 🔥 2. GENERAR TOKEN
    const token = jwt.sign(
      { user },
      SECRET,
      { expiresIn: '1h' }
    );

    // 🔥 3. RESPONDER
    res.json({
      token,
      user
    });

  } catch (err) {
    res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }
};