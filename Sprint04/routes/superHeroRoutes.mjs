//definimos las rutas necesarias para cada operacion del controlador 
import express from 'express';
import { obtenerSuperheroesMayoresDe30Controller,obtenerSuperheroePorIdController,obtenerTodosLosSuperheroesController,buscarSuperheroesPorAtributoController,crearSuperheroeController, actualizarSuperheroeController, eliminarSuperheroeController, eliminarSuperheroePorNombreController,agregarSuperheroeController,editarSuperheroeController  } from '../controllers/superheroesController.mjs';

// Importa las validaciones desde el middleware
import { 
    crearSuperheroeValidationRules, 
    actualizarSuperheroeValidationRules 
  } from '../middlewares/validationRules.mjs';  // Asegúrate de que la ruta sea correcta
  import { validar } from '../middlewares/validationRules.mjs'; // Importa el middleware de validación de errores
import { title } from 'process';

const router = express.Router();

//pagina de index
router.get('/index', (req, res) => {
  res.render('index', {title:'Inicio'});
});

router.get('/heroes', obtenerTodosLosSuperheroesController);

// Ruta GET para mostrar el formulario de edición
router.get('/heroes/:id/editar', obtenerSuperheroePorIdController);

router.get('/heroes/buscar/:atributo/:valor',buscarSuperheroesPorAtributoController);
router.get('/heroes/edad/mayores30',obtenerSuperheroesMayoresDe30Controller);

// Endpoint POST para crear un superhéroe
router.post('/crearSuperHeroe',crearSuperheroeValidationRules(),  // Valida los campos antes de procesar
validar,  // Middleware que maneja los errores de validación
crearSuperheroeController);

// Ruta para mostrar el formulario de agregar superhéroe----------------------------------------
router.get('/addSuperhero', (req, res) => {
  res.render('addSuperhero', { title: 'Agregar Superhéroe' });
});

// Ruta POST para agregar un superhéroe-----------------------------------------------
router.post('/heroes/agregar', 
  crearSuperheroeValidationRules(),  // Valida los campos antes de procesar
  validar,  // Middleware que maneja los errores de validación
  agregarSuperheroeController);  // Controlador para agregar el superhéroe

// Endpoint PUT para actualizar un superhéroe
router.put('/actualizarSuperHeroe/:id', crearSuperheroeValidationRules(),  // Valida los campos antes de procesar
validar,  // Middleware que maneja los errores de validación
actualizarSuperheroeController);

//-------------------------------------------------------------------------------------------------------------
// Ruta PUT para editar un superhéroe
router.post('/heroes/:id/editar', crearSuperheroeValidationRules(), validar, editarSuperheroeController);

// Endpoint DELETE para eliminar un superhéroe
// router.delete('/eliminarSuperHeroe/:id', eliminarSuperheroeController);

router.delete('/heroes/:id', eliminarSuperheroeController);

// Endpoint DELETE para eliminar un superhéroe por nombre
router.delete('/eliminarSuperHeroe/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;