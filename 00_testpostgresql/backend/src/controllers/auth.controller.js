import { authenticate } from "../services/ldap.service.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await authenticate(username, password);

    return res.status(200).json(result);
  } catch (err) {
 //   console.error("LDAP error:", err);

    return res.status(401).json({
      success: false,
      message: "Usuario o contraseña incorrectos",
   //   error: err.message || "Error desconocido",
    });
  }
};