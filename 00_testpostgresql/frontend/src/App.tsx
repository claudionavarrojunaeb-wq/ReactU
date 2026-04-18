import { useEffect, useState } from 'react';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
};

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<Usuario>({ id: '', nombre: '', email: '' });
  const [editando, setEditando] = useState(false);

  // 🔹 Obtener usuarios
  const cargarUsuarios = () => {
    fetch('http://localhost:3000/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // 🔹 Crear o editar
  const guardarUsuario = async () => {
    if (editando) {
      await fetch(`http://localhost:3000/api/usuarios/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ id: '', nombre: '', email: '' });
    setEditando(false);
    cargarUsuarios();
  };

  // 🔹 Eliminar
  const eliminarUsuario = async (id: string) => {
    await fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: 'DELETE',
    });
    cargarUsuarios();
  };

  // 🔹 Editar
  const editarUsuario = (u: Usuario) => {
    setForm(u);
    setEditando(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD Usuarios</h1>

      {/* FORMULARIO */}
      <div>
        <input
          placeholder="ID"
          value={form.id}
          onChange={e => setForm({ ...form, id: e.target.value })}
          disabled={editando}
        />
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <button onClick={guardarUsuario}>
          {editando ? 'Actualizar' : 'Crear'}
        </button>
      </div>

      {/* TABLA */}
      <table border={1} style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => editarUsuario(u)}>Editar</button>
                <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;