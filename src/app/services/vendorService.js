import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

export function searchVendors(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}admin/searchvendors`, requestOptions).then(
    authService.handleResponse
  );
}

export function getVendors(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}admin/vendors`, requestOptions).then(
    authService.handleResponse
  );
}

export function addVendor({
  shop_name,
  country_code,
  latitude,
  longitude,
  opening_time,
  closing_time,
  description,
  distance,
  delivery_fee,
  user_id,
}) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      shop_name,
      country_code,
      latitude,
      longitude,
      opening_time,
      closing_time,
      description,
      distance,
      delivery_fee,
      user_id,
    }),
  };
  return fetch(`${settings.API_URL}admin/addvendor`, requestOptions).then(
    authService.handleResponse
  );
}
