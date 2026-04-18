import ldap from "ldapjs";

const LDAP_URL = "ldap://10.16.200.221:389";

export function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({
      url: LDAP_URL,
    });

    const upn = `${username}@junaeb.local`;

    client.bind(upn, password, (err) => {
      client.unbind();

      if (err) {
        return reject(err);
      }

      resolve({
        success: true,
        message: "Login LDAP exitoso",
      });
    });
  });
}