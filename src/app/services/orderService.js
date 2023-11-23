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

  return fetch(`${settings.API_URL}admin/searchorders`, requestOptions).then(
    authService.handleResponse
  );
}

export function getOrders(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/orders`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/orders`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function getYoutubes(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}youtubes`, requestOptions).then(
    authService.handleResponse
  );
}

export function getNotices(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}notice`, requestOptions).then(
    authService.handleResponse
  );
}

export function editOrder({ id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      id,
    }),
  };

  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/updateorder`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/updateorder`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function deleteOrder(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/order/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function getReferrers(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}referrers`, requestOptions).then(
    authService.handleResponse
  );
}

export function getPrices(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}prices`, requestOptions).then(
    authService.handleResponse
  );
}

export function getAllReferrers(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}allreferrers`, requestOptions).then(
    authService.handleResponse
  );
}

export function editReferrer({ referrer_id, status }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      referrer_id,
      status,
    }),
  };

  return fetch(`${settings.API_URL}referrer/approve`, requestOptions).then(
    authService.handleResponse
  );
}

export function deleteReferrer(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/referrer/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function deletePrice(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/price/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function addProduct({ product_cost, percentage, status, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      product_cost,
      percentage,
      status,
      id,
    }),
  };
  return fetch(`${settings.API_URL}store/product`, requestOptions).then(
    authService.handleResponse
  );
}

export function editProduct({ product_cost, percentage, status, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      product_cost,
      percentage,
      status,
      id,
    }),
  };

  return fetch(
    `${settings.API_URL}updatetransaction/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function addTransaction({ product_cost, percentage, status, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      product_cost,
      percentage,
      status,
      id,
    }),
  };
  return fetch(`${settings.API_URL}add/transaction`, requestOptions).then(
    authService.handleResponse
  );
}

export function deleteTransaction(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(
      `${settings.API_URL}delete/transaction/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  }
}

export function getTransactions(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}transactions`, requestOptions).then(
    authService.handleResponse
  );
}
