import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

const authuser = JSON.parse(localStorage.getItem("user"));

export function searchPayments(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}admin/searchpayments`, requestOptions).then(
    authService.handleResponse
  );
}

export function getPayments(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/payments`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/payments`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function addPayment({
  amount,
  depositor,
  subscription_id,
  description,
  bank,
  date,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      amount,
      depositor,
      subscription_id,
      description,
      bank,
      date,
    }),
  };
  return fetch(`${settings.API_URL}vendor/addpayment`, requestOptions).then(
    authService.handleResponse
  );
}

export function editPayment({
  amount,
  depositor,
  subscription_id,
  description,
  bank,
  date,
  id,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      amount,
      depositor,
      subscription_id,
      description,
      bank,
      date,
      id,
    }),
  };

  return fetch(
    `${settings.API_URL}vendor/updatepayment/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function editPayment2({ is_active, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      is_active,
      id,
    }),
  };

  return fetch(
    `${settings.API_URL}admin/updatepayment/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function deletePayment(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(
    `${settings.API_URL}vendor/deletepayment/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}
