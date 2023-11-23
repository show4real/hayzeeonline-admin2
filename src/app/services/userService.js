import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

const authuser = JSON.parse(localStorage.getItem("user"));

export function searchUsers(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}searchusers`, requestOptions).then(
    authService.handleResponse
  );
}

export function getUsers(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}users`, requestOptions).then(
    authService.handleResponse
  );
}

export function addUser({ name, email, password, address, phone, admin }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      email,
      password,
      address,
      phone,
      admin,
    }),
  };
  return fetch(`${settings.API_URL}admin/adduser`, requestOptions).then(
    authService.handleResponse
  );
}

export function addProfile({
  firstname,
  lastname,
  phone,
  address,
  shop_name,
  country_code,
  latitude,
  longitude,
  opening_time,
  closing_time,
  description,
  distance,
  delivery_fee,
  image,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      firstname,
      lastname,
      phone,
      address,
      shop_name,
      country_code,
      latitude,
      longitude,
      opening_time,
      closing_time,
      description,
      distance,
      delivery_fee,
      image,
    }),
  };
  return fetch(`${settings.API_URL}vendor/addprofile`, requestOptions).then(
    authService.handleResponse
  );
}

export function addImage({ image }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      image,
    }),
  };
  return fetch(`${settings.API_URL}vendor/addimage`, requestOptions).then(
    authService.handleResponse
  );
}

export function editUser({
  firstname,
  lastname,
  email,
  password,
  address,
  phone,
  is_active,
  admin,
  vendor,
  customer,
  id,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      password,
      address,
      phone,
      is_active,
      admin,
      vendor,
      customer,
    }),
  };

  return fetch(
    `${settings.API_URL}admin/updateuser/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function getUser(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}user/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function recoverPassword(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}recoverpassword/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function getProfile() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}customer/profile`, requestOptions).then(
    authService.handleResponse
  );
}

export function getVendorProfile() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}vendor/profile`, requestOptions).then(
    authService.handleResponse
  );
}

export function getDashboard() {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  if (authuser !== null && authuser.admin == 1) {
    return fetch(`${settings.API_URL}admin/dashboard`, requestOptions).then(
      authService.handleResponse
    );
  } else if (authuser !== null && authuser.vendor == 1) {
    return fetch(`${settings.API_URL}vendor/dashboard`, requestOptions).then(
      authService.handleResponse
    );
  }
  return fetch(`${settings.API_URL}customer/dashboard`, requestOptions).then(
    authService.handleResponse
  );
}

export function resetPassword(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}resetpassword`, requestOptions).then(
    authService.handleResponse
  );
}

export function deleteUser(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/user/${id}`, requestOptions).then(
    authService.handleResponse
  );
}
