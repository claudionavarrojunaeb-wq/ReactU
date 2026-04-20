//D:\_ReactU\ReactU\00_testpostgresql\backend\auth-service\controllers\auth.controller.js
import jwt from 'jsonwebtoken';
import axios from 'axios'; // 👈 NUEVO
import { authenticate } from '../services/ldap.service.js';

const DEBUG_RECAPTCHA = process.env.DEBUG_RECAPTCHA === 'true';

export const login = async (req, res) => {
  try {
    const { username, password, captcha } = req.body;
    console.log("CAPTCHA TOKEN FROM FRONT:", captcha);
    console.log("RECAPTCHA_SECRET_V2 defined:", !!process.env.RECAPTCHA_SECRET_V2);
    console.log("LOGIN:", username);

    // ✅ validar campos
    if (!username || !password) {
      return res.status(400).json({
        error: 'username y password requeridos'
      });
    }

    // 🔐 VALIDAR CAPTCHA
    if (!captcha) {
      return res.status(400).json({ error: 'Captcha requerido' });
    }

    try {
      const verify = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret: process.env.RECAPTCHA_SECRET_V2, // 👈 desde .env
            response: captcha,
          },
        }
      );

      console.log("GOOGLE RESPONSE:", verify.data);

      const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');

      // For v3 reCAPTCHA, Google returns a score (0.0 - 1.0).
      // We reject when `success` is false or when `score` exists and is below threshold.
      if (!verify.data.success || (typeof verify.data.score === 'number' && verify.data.score < minScore)) {
        if (DEBUG_RECAPTCHA) {
          return res.status(403).json({ error: 'Captcha inválido', debug: verify.data });
        }
        return res.status(403).json({ error: 'Captcha inválido' });
      }

    } catch (err) {
      console.error("ERROR CAPTCHA:", err);
      return res.status(500).json({ error: 'Error validando captcha' });
    }

    // Read JWT secret at request time (dotenv is loaded in server.js after imports)
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
      console.error('JWT_SECRET no definido en el entorno');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    await authenticate(username, password);

    const role = username === 'admin' ? 'admin' : 'user';

    const token = jwt.sign({ user: username, role }, SECRET, { expiresIn: '1h' });

    res.json({ token, user: username, role });

  } catch (err) {
    console.error("ERROR EN LOGIN:", err);

    res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }
};