// src/routes/superHeroRoutes.mjs
import express from 'express';
import {
  obtenerTodosLosSuperheroesController,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroePorIdController,
  eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';  // Asegúrate de que la ruta al controlador sea correcta

// Importa las validaciones desde el middleware
import { crearSuperheroeValidationRules, actualizarSuperheroeValidationRules } from '../middleware/validationRules.mjs';  // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para obtener todos los superhéroes (GET)
router.get('/', obtenerTodosLosSuperheroesController);

// Ruta para crear un nuevo superhéroe (POST)
router.post('/', 
  crearSuperheroeValidationRules(),  // Asegúrate de que las validaciones estén bien configuradas
  crearSuperheroeController
);

// Ruta para actualizar un superhéroe por ID (PUT)
router.put('/:id', 
  actualizarSuperheroeValidationRules(),  // 
  actualizarSuperheroeController
);

// Ruta para eliminar un superhéroe por ID (DELETE)
router.delete('/id/:id', eliminarSuperheroePorIdController);

// Ruta para eliminar un superhéroe por nombre (DELETE)
router.delete('/nombre/:nombreSuperHeroe', eliminarSuperheroePorNombreController);

export default router;
