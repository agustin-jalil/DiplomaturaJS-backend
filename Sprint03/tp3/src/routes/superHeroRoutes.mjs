import express from 'express';
import SuperHero from '../models/SuperHero.mjs';
import { obtenerSuperheroePorIdController, agregarSuperHeroeController } from '../controllers/superHeroController.mjs';

const router = express.Router();

// Middleware para depuración de solicitudes entrantes
router.use((req, res, next) => {
  console.log(`Solicitud entrante: ${req.method} ${req.url}`);
  next();
});

// Página principal con lista de héroes
router.get('/', async (req, res) => {
  try {
    const heroes = await SuperHero.find(); // Obtener todos los héroes
    res.render('dashboard', { title: 'Dashboard de Superhéroes', heroes });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { title: 'Error', error: err });
  }
});

// Ruta para mostrar el formulario de creación de un nuevo héroe
router.get('/heroes/new', obtenerSuperheroePorIdController);

// Ruta para mostrar el formulario de edición de un héroe existente
router.get('/heroes/:id/edit', obtenerSuperheroePorIdController);

// Ruta para manejar la creación del superhéroe
router.post('/heroes', (req, res) => {
  agregarSuperHeroeController(req, res);
});

// Ruta específica para ver la lista de superhéroes
router.get('/list', async (req, res) => {
  try {
    const heroes = await SuperHero.find().select(
      'nombreSuperHeroe nombreReal nombreSociedad edad planetaOrigen debilidad poder habilidadEspecial aliado enemigo'
    );
    res.render('list', { title: 'Lista de Superhéroes', heroes });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { title: 'Error', error: err });
  }
});

// Ruta para procesar la edición
router.post('/heroes/:id/edit', async (req, res) => {
  const { id } = req.params;
  const {
    nombreSuperHeroe,
    nombreReal,
    nombreSociedad,
    edad,
    planetaOrigen,
    debilidad,
    poder,
    habilidadEspecial,
    aliado,
    enemigo
  } = req.body;

  // Procesar campos de lista
  const poderArray = poder ? poder.split(',').map(p => p.trim()) : [];
  const aliadoArray = aliado ? aliado.split(',').map(a => a.trim()) : [];
  const enemigoArray = enemigo ? enemigo.split(',').map(e => e.trim()) : [];

  try {
    await SuperHero.findByIdAndUpdate(id, {
      nombreSuperHeroe,
      nombreReal,
      nombreSociedad,
      edad,
      planetaOrigen,
      debilidad,
      poder: poderArray,
      habilidadEspecial,
      aliado: aliadoArray,
      enemigo: enemigoArray
    });
    res.redirect('/list');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { title: 'Error del servidor', error: err });
  }
});

// Ruta para eliminar un superhéroe
router.delete('/heroes/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    const hero = await SuperHero.findByIdAndDelete(id); // Elimina el superhéroe por ID
    if (!hero) {
      return res.status(404).render('error', { title: 'No encontrado', error: 'Superhéroe no encontrado.' });
    }
    res.redirect('/list'); // Redirige después de la eliminación
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { title: 'Error', error: err });
  }
});

// Middleware para manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).render('error', { title: 'Página no encontrada', error: 'La página solicitada no existe.' });
});

export default router;
