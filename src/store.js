// Almacen en memoria de productos
let productos = [];
let siguienteId = 1;

// Limpia el almacen (util para las pruebas)
function reiniciar() {
  productos = [];
  siguienteId = 1;
}

// Devuelve todos los productos
function listar() {
  return productos;
}

// Busca un producto por id
function obtener(id) {
  return productos.find((producto) => producto.id === id);
}

// Crea un producto nuevo
function crear({ nombre, precio, stock }) {
  const producto = { id: siguienteId, nombre, precio, stock };
  siguienteId += 1;
  productos.push(producto);
  return producto;
}

// Actualiza un producto existente
function actualizar(id, datos) {
  const producto = obtener(id);
  if (!producto) return null;

  if (datos.nombre !== undefined) producto.nombre = datos.nombre;
  if (datos.precio !== undefined) producto.precio = datos.precio;
  if (datos.stock !== undefined) producto.stock = datos.stock;

  return producto;
}

// Elimina un producto por id
function eliminar(id) {
  const indice = productos.findIndex((producto) => producto.id === id);
  if (indice === -1) return false;

  productos.splice(indice, 1);
  return true;
}

// Exporta las operaciones del almacen
module.exports = {
  reiniciar,
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
};
