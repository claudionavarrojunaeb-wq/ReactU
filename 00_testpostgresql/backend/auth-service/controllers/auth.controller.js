import jwt from 'jsonwebtoken';
import { authenticate } from '../services/ldap.service.js';

const SECRET = 'secreto123';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("LOGIN:", username, password);

    if (!username || !password) {
      return res.status(400).json({
        error: 'username y password requeridos'
      });
    }

    // 🔥 DEBUG
    console.log("ANTES DE LDAP");

    await authenticate(username, password);

    console.log("DESPUÉS DE LDAP");

    const token = jwt.sign(
      { user: username },
      SECRET,
      { expiresIn: '1h' }
    );

    console.log("TOKEN GENERADO");

    res.json({
      token,
      user: username
    });

  } catch (err) {
    console.error("ERROR EN LOGIN:", err);

    res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }
};