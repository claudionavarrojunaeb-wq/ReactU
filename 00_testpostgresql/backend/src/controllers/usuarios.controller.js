import { pool } from "../config/db.js";

export const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios ORDER BY usuariosid"
    );

    const cleanData = result.rows.map(u => ({
      id: u.usuariosid?.trim(),
      nombre: u.usuariosnombre?.trim(),
      email: u.usuariosemail?.trim(),
    }));

    res.json(cleanData);
  } catch (error) {
    res.status(500).send("Error en la consulta");
  }
};

export const createUsuario = async (req, res) => {
  const { id, nombre, email } = req.body;

  await pool.query(
    "INSERT INTO usuarios (usuariosid, usuariosnombre, usuariosemail) VALUES ($1,$2,$3)",
    [id, nombre, email]
  );

  res.send("Usuario creado");
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  await pool.query(
    "UPDATE usuarios SET usuariosnombre=$1, usuariosemail=$2 WHERE TRIM(usuariosid)=$3",
    [nombre, email, id.trim()]
  );

  res.send("Usuario actualizado");
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM usuarios WHERE usuariosid=$1",
    [id]
  );

  res.send("Usuario eliminado");
};