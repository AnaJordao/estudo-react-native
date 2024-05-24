import axios from "axios";

const API_KEY = "AIzaSyB_aktqbwK4kUiemCf-Jwl7YBx6qSKHJCY";

async function authenticate(email, password, mode) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const res = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = res.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate(email, password, "signUp");
}

export function login(email, password) {
  return authenticate(email, password, "signInWithPassword");
}
