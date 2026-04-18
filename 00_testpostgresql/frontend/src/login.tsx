import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Intentamos leer JSON de forma segura
      const data = await res.json().catch(() => null);

      // Si el backend responde error (401, 500, etc.)
      if (!res.ok) {
        setMessage(data?.message || "Usuario o contraseña incorrectos");
        return;
      }

      // Login OK
      setMessage(data?.message || "Login exitoso");
    } catch (error) {
      // Error de red (backend caído, CORS, etc.)
      setMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Login LDAP</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="nombre.apellido"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}