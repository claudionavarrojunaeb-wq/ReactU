// import { useState } from "react";

// export default function Login({ onLogin }: any) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:3002/auth/login", { // ✅ puerto correcto
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username, // ⚠️ tu backend usa "user"
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(data?.error || "Usuario o contraseña incorrectos");
//         return;
//       }

//       // ✅ GUARDAR TOKEN
//       localStorage.setItem("token", data.token);

//       // ✅ CAMBIAR ESTADO GLOBAL
//       onLogin();

//     } catch (error) {
//       setMessage("Error de conexión con el servidor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
//       <h2>Login LDAP</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="nombre.apellido"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{ width: "100%", padding: 8, marginBottom: 10 }}
//         />

//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ width: "100%", padding: 8, marginBottom: 10 }}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Ingresando..." : "Ingresar"}
//         </button>
//       </form>

//       <p>{message}</p>
//     </div>
//   );
// }


/////////////////////////////////////////////////////////////////////////////////con ojito
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// export default function App(): JSX.Element {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showPassword, setShowPassword] = useState<boolean>(false);

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");

//     console.log("🔐 Intentando login...");

//     try {
//       const res = await fetch("http://localhost:3002/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       const data = await res.json();

//       console.log("RESPUESTA:", data);

//       if (!res.ok) {
//         setMessage(data.error || "Credenciales inválidas");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       setMessage("Login exitoso 🚀");

//     } catch (err) {
//       console.error("ERROR FETCH:", err);
//       setMessage("Error de conexión con el servidor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#0f172a",
//         color: "white",
//       }}
//     >
//       <form
//         onSubmit={handleLogin}
//         style={{
//           width: 300,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 20 }}>
//           Login LDAP
//         </h2>

//         {/* USERNAME */}
//         <input
//           type="text"
//           placeholder="nombre.apellido"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "10px",
//             borderRadius: "5px",
//             border: "none",
//             outline: "none",
//             boxSizing: "border-box",
//           }}
//         />

//         {/* PASSWORD */}
//         <div style={{ position: "relative", width: "100%" }}>
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               paddingRight: "40px",
//               marginBottom: "10px",
//               borderRadius: "5px",
//               border: "none",
//               outline: "none",
//               boxSizing: "border-box",
//             }}
//           />

//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             style={{
//               position: "absolute",
//               right: "10px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               cursor: "pointer",
//               color: "#555",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         {/* BOTÓN */}
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: "10px",
//             borderRadius: "5px",
//             border: "none",
//             cursor: "pointer",
//             background: "#2563eb",
//             color: "white",
//             fontWeight: "bold",
//           }}
//         >
//           {loading ? "Ingresando..." : "Ingresar"}
//         </button>

//         {/* MENSAJE */}
//         <p style={{ marginTop: 10, textAlign: "center" }}>
//           {message}
//         </p>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ onLogin }: any): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Credenciales inválidas");
        return;
      }

      // ✅ guardar token
      localStorage.setItem("token", data.token);

      // 🔥 ESTA LÍNEA ES LA CLAVE
      onLogin();

    } catch (err) {
      console.error("ERROR FETCH:", err);
      setMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Login LDAP
        </h2>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="nombre.apellido"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "none",
            boxSizing: "border-box",
          }}
        />

        {/* PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              paddingRight: "40px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "none",
              boxSizing: "border-box",
            }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            background: "#2563eb",
            color: "white",
          }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p style={{ marginTop: 10 }}>{message}</p>
      </form>
    </div>
  );
}