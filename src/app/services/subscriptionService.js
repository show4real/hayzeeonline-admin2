import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

export function searchSubscriptions(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(
    `${settings.API_URL}admin/searchsubscriptions`,
    requestOptions
  ).then(authService.handleResponse);
}

export function getSubscriptions(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}admin/subscriptions`, requestOptions).then(
    authService.handleResponse
  );
}

export function addSubscription({ name, price, days }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      price,
      days,
    }),
  };
  return fetch(`${settings.API_URL}admin/addsubscription`, requestOptions).then(
    authService.handleResponse
  );
}

export function editSubscription({ name, price, days, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      price,
      days,
      id,
    }),
  };

  return fetch(
    `${settings.API_URL}admin/updatesubscription/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function deleteSubscription(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(
    `${settings.API_URL}admin/deletesubscription/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}
