import { Client } from "ldapts";

const LDAP_URL = "ldap://10.16.200.221:389";

export async function authenticate(username, password) {
  const client = new Client({
    url: LDAP_URL,
  });

  const upn = `${username}@junaeb.local`;

  try {
    await client.bind(upn, password);

    return {
      success: true,
      message: "Login LDAP exitoso",
    };
  } catch (err) {
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