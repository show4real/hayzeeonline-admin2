import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";
const authuser = JSON.parse(localStorage.getItem("user"));

export function searchProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch(`${settings.API_URL}searchproducts`, requestOptions).then(
    authService.handleResponse
  );
}

export function getProducts(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}products`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function addProduct({
  name,
  is_active,
  category,
  storage,
  processor,
  price,
  description,
  images,
  productInfos,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      is_active,
      category,
      storage,
      processor,
      price,
      description,
      images,
      productInfos,
    }),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}store/product`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function editProduct({
  cloth_name,
  price,
  shop_id,
  service_id,
  category_id,
  is_active,
  image,
  id,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      cloth_name,
      price,
      shop_id,
      service_id,
      category_id,
      is_active,
      image,
      id,
    }),
  };

  if (authuser && authuser.admin == 1) {
    return fetch(`${settings.API_URL}updateproduct/${id}`, requestOptions).then(
      authService.handleResponse
    );
  }
}

export function deleteProduct(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  if (authuser && authuser.admin == 1) {
    return fetch(
      `${settings.API_URL}delete/product/${id}`,
      requestOptions
    ).then(authService.handleResponse);
  }
}

export function getOrders(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}orders`, requestOptions).then(
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

export function getAllCats(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/allcats`, requestOptions).then(
    authService.handleResponse
  );
}

export function getBrands(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}user/brands`, requestOptions).then(
    authService.handleResponse
  );
}
