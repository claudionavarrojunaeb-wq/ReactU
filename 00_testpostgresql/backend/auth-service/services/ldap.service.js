import ldap from "ldapts";

const LDAP_URL = "ldap://10.16.200.221:389";

// export function authenticate(username, password) {
//   return new Promise((resolve, reject) => {
//     const client = ldap.createClient({
//       url: LDAP_URL,
//     });

//     const upn = `${username}@junaeb.local`;

//     client.bind(upn, password, (err) => {
//       client.unbind();

//       if (err) {
//         return reject(err);
//       }

//       resolve({
//         success: true,
//         message: "Login LDAP exitoso",
//       });
//     });
//   });
// }

export function authenticate(username, password) {
  return new Promise((resolve, reject) => {

    // 🔥 usuarios fake
    if (username === "admin" && password === "1234") {
      return resolve({
        success: true,
        message: "Login mock exitoso"
      });
    }

    reject(new Error("Credenciales inválidas"));
  });
}