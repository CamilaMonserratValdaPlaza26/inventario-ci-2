// Importa Express y el almacen de productos
const express = require('express');
const store = require('./store');

// Crea la aplicacion
const app = express();
app.use(express.json());

// Ruta de estado del servicio
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', version: '2.0.0' });
});

// Pagina informativa de la API (evidencia del Laboratorio 5.1)
app.get('/', (req, res) => {
  res.status(200).type('html').send(`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>API de Inventario - Laboratorio 5.1</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      background: #f4f4f5;
      color: #27272a;
      line-height: 1.6;
    }
    main {
      max-width: 760px;
      margin: 48px auto;
      padding: 32px;
      background: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 10px;
    }
    h1 { margin-top: 0; font-size: 1.6rem; color: #18181b; }
    h2 { margin-top: 32px; font-size: 1.1rem; color: #3f3f46; }
    p { color: #52525b; }
    a { color: #3f3f46; }
    code {
      background: #f4f4f5;
      border: 1px solid #e4e4e7;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.9em;
    }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e4e4e7; }
    th { background: #fafafa; color: #3f3f46; font-weight: 600; }
    .links { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
    .links a {
      padding: 8px 14px;
      border: 1px solid #d4d4d8;
      border-radius: 6px;
      text-decoration: none;
      background: #fafafa;
    }
    .links a:hover { background: #f4f4f5; }
    footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 0.9rem; }
  </style>
</head>
<body>
  <main>
    <h1>API de Inventario</h1>
    <p>Servicio CRUD de productos desarrollado con Node.js y Express para el Laboratorio 5.1 de la asignatura COM610.</p>

    <div class="links">
      <a href="/health">Ver estado del servicio</a>
      <a href="/productos">Ver productos</a>
    </div>

    <h2>Endpoints</h2>
    <table>
      <thead>
        <tr><th>Metodo</th><th>Ruta</th><th>Descripcion</th></tr>
      </thead>
      <tbody>
        <tr><td>GET</td><td><code>/health</code></td><td>Estado del servicio</td></tr>
        <tr><td>GET</td><td><code>/productos</code></td><td>Lista todos los productos</td></tr>
        <tr><td>GET</td><td><code>/productos/:id</code></td><td>Obtiene un producto por id</td></tr>
        <tr><td>POST</td><td><code>/productos</code></td><td>Crea un producto</td></tr>
        <tr><td>PUT</td><td><code>/productos/:id</code></td><td>Actualiza un producto</td></tr>
        <tr><td>DELETE</td><td><code>/productos/:id</code></td><td>Elimina un producto</td></tr>
      </tbody>
    </table>

    <footer>Laboratorio 5.1 - Integracion continua con GitHub Actions</footer>
  </main>
</body>
</html>`);
});

// Lista todos los productos
app.get('/productos', (req, res) => {
  res.status(200).json(store.listar());
});

// Obtiene un producto por id
app.get('/productos/:id', (req, res) => {
  const producto = store.obtener(Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(producto);
});

// Crea un producto
app.post('/productos', (req, res) => {
  const { nombre, precio, stock } = req.body;

  // Valida los campos obligatorios
  if (!nombre || typeof precio !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ error: 'nombre, precio y stock son obligatorios' });
  }

  const producto = store.crear({ nombre, precio, stock });
  res.status(201).json(producto);
});

// Actualiza un producto
app.put('/productos/:id', (req, res) => {
  const producto = store.actualizar(Number(req.params.id), req.body);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(producto);
});

// Elimina un producto
app.delete('/productos/:id', (req, res) => {
  const eliminado = store.eliminar(Number(req.params.id));
  if (!eliminado) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(204).send();
});

// Exporta la app para las pruebas
module.exports = app;
