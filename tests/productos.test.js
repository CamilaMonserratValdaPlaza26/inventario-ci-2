// Supertest simula peticiones HTTP
const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

// Limpia el almacen antes de cada prueba
beforeEach(() => {
  store.reiniciar();
});

// Pruebas de la API de inventario
describe('API de inventario', () => {
  test('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok', version: '2.0.0' });
  });

  test('GET / responde con la pagina informativa', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('API de Inventario');
  });

  test('GET /productos devuelve lista vacia', async () => {
    const res = await request(app).get('/productos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /productos crea un producto', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ nombre: 'Laptop', precio: 1200, stock: 5 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 1, nombre: 'Laptop', precio: 1200, stock: 5 });
  });

  test('POST /productos valida campos obligatorios', async () => {
    const res = await request(app).post('/productos').send({ nombre: 'Laptop' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /productos/:id devuelve un producto', async () => {
    store.crear({ nombre: 'Mouse', precio: 20, stock: 10 });
    const res = await request(app).get('/productos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Mouse');
  });

  test('GET /productos/:id devuelve 404 si no existe', async () => {
    const res = await request(app).get('/productos/99');
    expect(res.statusCode).toBe(404);
  });

  test('PUT /productos/:id actualiza un producto', async () => {
    store.crear({ nombre: 'Mouse', precio: 20, stock: 10 });
    const res = await request(app)
      .put('/productos/1')
      .send({ precio: 25, stock: 8 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Mouse', precio: 25, stock: 8 });
  });

  test('PUT /productos/:id devuelve 404 si no existe', async () => {
    const res = await request(app).put('/productos/99').send({ precio: 10 });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /productos/:id elimina un producto', async () => {
    store.crear({ nombre: 'Teclado', precio: 50, stock: 3 });
    const res = await request(app).delete('/productos/1');
    expect(res.statusCode).toBe(204);
    expect(store.listar()).toHaveLength(0);
  });

  test('DELETE /productos/:id devuelve 404 si no existe', async () => {
    const res = await request(app).delete('/productos/99');
    expect(res.statusCode).toBe(404);
  });
});
