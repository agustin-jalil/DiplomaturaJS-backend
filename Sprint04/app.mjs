// Inicializar el servidor, conectar con la BD y cargar las rutas para gestionar todas las solicitudes relacionadas con los superhéroes
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { connect } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path'; // Para manejar rutas de archivos
import methodOverride from 'method-override';

const app = express();
const PORT = 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.resolve('views')); // Directorio de vistas
app.use(expressLayouts); // Habilita express-ejs-layouts
app.set('layout', 'layout'); // Configura layout por defecto

// Middleware para parsear JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
connect();

app.use((req, res, next) => {
    console.log('Método:', req.method);
    console.log('Ruta:', req.path);
    console.log('Cabeceras:', req.headers);
    console.log('Cuerpo:', req.body);
    next();
});

// Usar method-override para manejar métodos DELETE
app.use(methodOverride('_method'));

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).render('404', { mensaje: "Ruta no encontrada" }); // Vista de error 404
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Servidor corriendo en http://localhost:${PORT}/api/index`);
});
