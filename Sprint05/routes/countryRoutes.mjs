// routes/countryRoutes.mjs
import express from 'express';
import * as countryService from '../services/countryService.mjs';
import { obtenerTodosLosPaisesController, agregarPaisController,obtenerPaisPorIdController,editarPaisController, eliminarPaisController, fetchAndStoreCountriesController } from '../controllers/countryController.mjs';
import { crearEditarPaisValidationRules, validar } from '../middlewares/validationRules.mjs';

const router = express.Router();

//pagina de index
router.get('/index', (req, res) => {
    res.render('index', {title:'Inicio'});
  });

// Ruta para iniciar el proceso de obtención y almacenamiento de países
router.get('/fetch-countries', fetchAndStoreCountriesController);

//mostrar la tabla con los piases en la base de datos 
router.get('/countries', obtenerTodosLosPaisesController);

// Ruta para mostrar el formulario de agregar país
router.get('/countries/add', (req, res) => {
  res.render('addCountry', { title: 'Agregar País' , messages: req.flash()});
});

// Ruta para manejar la solicitud de agregar país
router.post('/countries/add', crearEditarPaisValidationRules(), validar, agregarPaisController);

// Ruta para mostrar el formulario de edición de un país
router.get('/countries/:id/editar', obtenerPaisPorIdController);

// Ruta para manejar la solicitud de edición de un país
router.put('/countries/:id/editar', crearEditarPaisValidationRules(), validar, editarPaisController);

// Ruta para manejar la solicitud de eliminación de un país
router.delete('/countries/:id', eliminarPaisController);


export default router;


