// Importa la app y define el puerto
const app = require('./src/app');
const PORT = process.env.PORT || 3001;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
