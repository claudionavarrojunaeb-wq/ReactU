import { Client } from "ldapts";

// =======================
// 🔑 CONFIG DESDE .env
// =======================



// =======================
// 🔐 AUTHENTICATE
// =======================
export async function authenticate(username, password) {

  const LDAP_URL = process.env.LDAP_URL;
const LDAP_DOMAIN = process.env.LDAP_DOMAIN;
console.log("LDAP URL:", LDAP_URL);
console.log("LDAP URL:", process.env.LDAP_URL);
  const client = new Client({
    url: LDAP_URL,
  });

   const upn = `${username}@${LDAP_DOMAIN}`;
  //const upn = `JUNAEB\\${username}`;
  console.log("Intentando login con:", upn);
  console.log("UPN:", upn);
  try {
    try {
      await client.bind(upn, password);
      console.log("✅ BIND OK");
    } catch (err) {
      console.error("🔥 BIND ERROR:", err);
      throw err;
    }

    return {
      success: true,
      message: "Login LDAP exitoso",
    };

  } catch (err) {
  console.error("🔥 LDAP ERROR COMPLETO:");
  console.error(err);
  console.error("code:", err.code);
  console.error("message:", err.message);
  throw new Error("Credenciales inválidas");

  } finally {
    await client.unbind();
  }

}
  
// export function authenticate(username, password) {
//   return new Promise((resolve, reject) => {

//     // 🔥 usuarios fake
//     if (username === "admin" && password === "1234") {
//       return resolve({
//         success: true,
//         message: "Login mock exitoso"
//       });
//     }

//     reject(new Error("Credenciales inválidas"));
//   });
// }