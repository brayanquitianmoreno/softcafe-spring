// Centraliza las solicitudes HTTP que conectan React con Spring Boot.
const API_URL = 'http://localhost:8080/api/productos';

async function procesarRespuesta(response) {
  if (!response.ok) {
    const detalle = await response.text();
    throw new Error(detalle || `Error del servidor (${response.status})`);
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function obtenerProductos() {
  const response = await fetch(API_URL);
  return procesarRespuesta(response);
}

export async function crearProducto(producto) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return procesarRespuesta(response);
}

export async function actualizarProducto(id, producto) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return procesarRespuesta(response);
}

export async function eliminarProducto(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return procesarRespuesta(response);
}
