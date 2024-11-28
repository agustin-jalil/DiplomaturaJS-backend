// src/routes/superHeroRoutes.mjs
import express from 'express';
import {
  obtenerTodosLosSuperheroesController,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroePorIdController,
  eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';  // Fijarse que la ruta al controlador sea correcta

// Importa las validaciones desde el middleware
import { 
  crearSuperheroeValidationRules, 
  actualizarSuperheroeValidationRules 
} from '../middleware/validationRules.mjs';  // Fijarse que la ruta sea correcta
import { validar } from '../middleware/validationRules.mjs'; // Importa el middleware de validación de errores

const router = express.Router();

// Ruta para obtener todos los superhéroes (GET)
router.get('/', obtenerTodosLosSuperheroesController);

// Ruta para crear un nuevo superhéroe (POST)
router.post('/', 
  crearSuperheroeValidationRules(),  // Valida los campos antes de procesar
  validar,  // Middleware que maneja los errores de validación
  crearSuperheroeController
);

// Ruta para actualizar un superhéroe por ID (PUT)
router.put('/:id', 
  actualizarSuperheroeValidationRules(),  // Valida los campos antes de procesar
  validar,  // Middleware que maneja los errores de validación
  actualizarSuperheroeController
);

// Ruta para eliminar un superhéroe por ID (DELETE)
router.delete('/id/:id', eliminarSuperheroePorIdController);

// Ruta para eliminar un superhéroe por nombre (DELETE)
router.delete('/nombre/:nombreSuperHeroe', eliminarSuperheroePorNombreController);

export default router;
