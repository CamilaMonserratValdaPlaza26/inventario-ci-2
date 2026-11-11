# inventario-ci

API CRUD de inventario con integracion continua.

## Tecnologias

- Node.js y Express
- Jest y Supertest
- ESLint

## Endpoints

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/` | Pagina informativa de la API |
| GET | `/health` | Estado del servicio |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/:id` | Obtiene un producto por id |
| POST | `/productos` | Crea un producto |
| PUT | `/productos/:id` | Actualiza un producto |
| DELETE | `/productos/:id` | Elimina un producto |

## Ejecutar localmente

```bash
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`.

## Pruebas

```bash
npm test
npm run test:coverage
```

## Docker

Construccion y ejecucion local de la imagen:

```bash
docker build -t inventario-api:local .
docker run -d -p 3000:3000 --name inventario-local inventario-api:local
curl http://localhost:3000/health
```

## Despliegue continuo

El workflow `.github/workflows/cd.yml` construye la imagen, la publica en Docker Hub y la despliega en un servidor remoto mediante SSH. Requiere los secretos `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `SSH_HOST`, `SSH_USER` y `SSH_PRIVATE_KEY`, y opcionalmente la variable `IMAGE_NAME`.

## Documentacion del Laboratorio

Puedes encontrar los informes completos con capturas de pantalla y evidencias en:

- [Ver informe del Laboratorio 5.2](./INFORME.md)
- [Ver informe del Laboratorio 5.1](./INFORME-LAB-5.1.md)
