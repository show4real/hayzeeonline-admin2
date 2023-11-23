import settings from "./settings";
import { authHeader } from "./authHeader";

export const authService = {
  login,
  logout,
  profile,
  handleResponse,
  sendrecovery,
};
export function getUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  return user || false;
}

export function login({ email, password }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${settings.API_URL}login`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.user) {
        response.user.token = response.token;
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    });
}

export function register({ firstname, lastname, email, password }) {
  console.log(email);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password }),
  };
  return fetch(`${settings.API_URL}vendor_register`, requestOptions).then(
    handleResponse
  );
}

export function sendrecovery({ email }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  return fetch(`${settings.API_URL}sendrecovery`, requestOptions).then(
    handleResponse
  );
}

export function profile() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}profile`, requestOptions)
    .then(authService.handleResponse)
    .then((response) => {
      if (response.user) {
        return response.user;
      }
      return response;
    });
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("company");
  localStorage.removeItem("permissions");
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      } else if (response.status === 403) {
        window.location.href = "/";
      }

      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
