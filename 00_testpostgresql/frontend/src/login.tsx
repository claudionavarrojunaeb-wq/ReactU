import { useState } from "react";

export default function Login({ onLogin }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3002/auth/login", { // ✅ puerto correcto
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: username, // ⚠️ tu backend usa "user"
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || "Usuario o contraseña incorrectos");
        return;
      }

      // ✅ GUARDAR TOKEN
      localStorage.setItem("token", data.token);

      // ✅ CAMBIAR ESTADO GLOBAL
      onLogin();

    } catch (error) {
      setMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
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