import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";
const authuser = JSON.parse(localStorage.getItem("user"));

export function searchOrders(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}customer/orders`, requestOptions).then(
    authService.handleResponse
  );
}

export function getOrders(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}customer/orders`, requestOptions).then(
    authService.handleResponse
  );
}
