# inventario-ci-2

API CRUD de inventario con integracion continua y despliegue continuo.

## Tecnologias

- Node.js y Express
- Jest y Supertest
- ESLint
- Docker y Docker Hub
- GitHub Actions
- Trivy

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

El workflow `.github/workflows/cd.yml` se ejecuta en `push` a `main` y a `staging`:

- Construye la imagen con el `Dockerfile` multi-stage.
- La publica en Docker Hub con el SHA del commit y con `latest` (en `main`) o `staging` (en `staging`).
- Ejecuta un escaneo de vulnerabilidades con Trivy.
- Despliega en el entorno `production` cuando la rama es `main` y en `staging` cuando la rama es `staging`.

Cada entorno de GitHub tiene sus propios secretos `SSH_HOST`, `SSH_USER` y `SSH_PRIVATE_KEY`, y las variables `DEPLOY_PORT` y `CONTAINER_NAME`. Los secretos del repositorio `DOCKER_USERNAME` y `DOCKER_PASSWORD` se usan para publicar la imagen.

El despliegue levanta la nueva version en un puerto alterno, valida `GET /health` y solo entonces reemplaza el contenedor activo. Si el health check falla, la version anterior sigue funcionando.

## Documentacion del Laboratorio

El informe completo con la descripcion del pipeline, las capturas de pantalla, las evidencias de cada etapa, el rollback y la practica individual esta en:

- [Ver informe del Laboratorio 5.2](./INFORME.md)
