import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

export function getBlogs(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}blogs`, requestOptions).then(
    authService.handleResponse
  );
}

export function addBlog({ name, image, description }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      image,
      description,
    }),
  };
  return fetch(`${settings.API_URL}store/description`, requestOptions).then(
    authService.handleResponse
  );
}

export function editBlog({ name, id, image, description }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      name,
      id,
      image,
      description,
    }),
  };

  return fetch(`${settings.API_URL}update/blog/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function deleteBlog(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/blog/${id}`, requestOptions).then(
    authService.handleResponse
  );
}
