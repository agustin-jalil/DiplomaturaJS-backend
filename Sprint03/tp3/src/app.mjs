import express from 'express';
import path from 'path';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import { obtenerSuperheroePorIdController } from './controllers/superHeroController.mjs';
import methodOverride from 'method-override';

const app = express();
const PORT = 3000;

// Configurar method-override para soportar otros métodos HTTP
app.use(methodOverride('_method')); // Se asegura de que los formularios POST se conviertan en DELETE

// Conexión a MongoDB
connectDB();

// Configuración de vistas y EJS
app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));

// Rutas
app.use('/', superHeroRoutes);

// Error 404
app.use((req, res) => {
  res.status(404).render('error', { title: 'Página no encontrada', error: 'La página solicitada no existe.' });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
