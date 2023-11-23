import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";
const authuser = JSON.parse(localStorage.getItem("user"));

export function searchDrivers(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}admin/searchdrivers`, requestOptions).then(
    authService.handleResponse
  );
}

export function getDrivers(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/drivers`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/drivers`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function addDriver({
  name,
  email,
  address,
  password,
  fleet_number,
  fleet_type,
  image,
  is_active,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      email,
      address,
      password,
      fleet_number,
      fleet_type,
      image,
      is_active,
    }),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/adddriver`, requestOptions).then(
      authService.handleResponse
    );
  } else {
    return fetch(`${settings.API_URL}vendor/adddriver`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function editDriver({
  name,
  email,
  address,
  fleet_number,
  fleet_type,
  image,
  is_active,
  id,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      email,
      address,
      fleet_number,
      fleet_type,
      image,
      is_active,
      id,
    }),
  };

  if (authuser && authuser.admin == 1) {
    return fetch(
      `${settings.API_URL}admin/updatedriver/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  } else {
    return fetch(
      `${settings.API_URL}vendor/updatedriver/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  }
}

export function deleteDriver(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(
      `${settings.API_URL}admin/deletedriver/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  } else {
    return fetch(
      `${settings.API_URL}vendor/deletedriver/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  }
}
