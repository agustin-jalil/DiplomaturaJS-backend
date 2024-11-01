//definimos las rutas necesarias para cada operacion del controlador 
import express from 'express';

import { obtenerSuperheroesMayoresDe30Controller,obtenerSuperheroePorIdController,obtenerTodosLosSuperheroesController,buscarSuperheroesPorAtributoController } from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor',buscarSuperheroesPorAtributoController);
router.get('/heroes/edad/mayores30',obtenerSuperheroesMayoresDe30Controller);

export default router;
