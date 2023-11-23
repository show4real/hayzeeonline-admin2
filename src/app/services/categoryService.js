import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

export function searchCategories(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}searchcategories`, requestOptions).then(
    authService.handleResponse
  );
}

export function getCategories(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}categories`, requestOptions).then(
    authService.handleResponse
  );
}

export function getBrands(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}brands`, requestOptions).then(
    authService.handleResponse
  );
}

export function addCategory({ name, image }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      image,
    }),
  };
  return fetch(`${settings.API_URL}store/category`, requestOptions).then(
    authService.handleResponse
  );
}

export function editCategory({ name, id, image }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      id,
      image,
    }),
  };

  return fetch(`${settings.API_URL}update/category/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function deleteCategory(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/category/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function deleteBrand(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/brand/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function getProductDescriptions(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(
    `${settings.API_URL}product/descriptions/${id}`,
    requestOptions
  ).then(authService.handleResponse);
}

export function getProductImages(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}product/images/${id}`, requestOptions).then(
    authService.handleResponse
  );
}
