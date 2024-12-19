// app.mjs
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { connect } from './config/db.mjs';
import countryRoutes from './routes/countryRoutes.mjs';
import path from 'path'; // Para manejar rutas de archivos
import methodOverride from 'method-override';
import flash from 'connect-flash';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.resolve('views')); // Directorio de vistas
app.use(expressLayouts); // Habilita express-ejs-layouts
app.set('layout', 'layout'); // Configuro layout por defecto

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuro sesiones
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Configuro flash
app.use(flash());

// Middleware para pasar mensajes flash a todas las vistas
app.use((req, res, next) => {
    res.locals.messages = req.flash(); // Hace que messages esté disponible globalmente
    next();
});

// Conexión a MongoDB
connect();

// Usar method-override para manejar métodos DELETE
app.use(methodOverride('_method'));

// Configuración de rutas
app.use('/api', countryRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).render('404', { mensaje: "Ruta no encontrada" }); // Vista de error 404
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Servidor corriendo en http://localhost:${PORT}/api/index`);
});
