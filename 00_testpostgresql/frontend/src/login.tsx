//D:\_ReactU\ReactU\00_testpostgresql\frontend\src\login.tsx
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Using reCAPTCHA v3: we will request a token with `executeRecaptcha('login')`
// and send it to the backend. Site key (v3) is configured in main.tsx provider.
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function Login({ onLogin }: any): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // reCAPTCHA v3 does not require local token state: we will obtain a
  // token at submit time with `executeRecaptcha`.
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtain reCAPTCHA v3 token (action = 'login')
    if (!executeRecaptcha) {
      setMessage('reCAPTCHA no disponible');
      return;
    }

    const captchaToken = await executeRecaptcha('login');
    if (!captchaToken) {
      setMessage('No se obtuvo token de captcha');
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      console.log('reCAPTCHA v3 token (frontend):', captchaToken);
      const res = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          captcha: captchaToken, // token v3
        }),
      });

   const data = await res.json();
//       const text = await res.text();
// console.log("RESPONSE RAW:", text);
// return; // 👈 importante para frenar aquí

      if (!res.ok) {
        setMessage(data.error || "Credenciales inválidas");
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin();

    } catch (err) {
      console.error(err);
      setMessage("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white",
    }}>
      <form onSubmit={handleLogin} style={{ width: 300, display: "flex", flexDirection: "column" }}>
        
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Login LDAP
        </h2>

        <input
          type="text"
          placeholder="nombre.apellido"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, marginBottom: 10 }}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, marginBottom: 10, width: "100%" }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* reCAPTCHA v3 is used: token is obtained at submit time via executeRecaptcha. */}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 10,
            padding: 10,
            background: "#2563eb",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p style={{ marginTop: 10 }}>{message}</p>
      </form>
    </div>
  );
}