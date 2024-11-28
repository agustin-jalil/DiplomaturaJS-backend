// src/middleware/validationRules.mjs
import { body, param } from 'express-validator';
import mongoose from 'mongoose';

// Función para validar si un ID es válido en MongoDB
const validarObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('El ID no es válido');
  }
  return true;
};

// Reglas para crear un superhéroe
export const crearSuperheroeValidationRules = () => {
  return [
    body('nombreSuperHeroe')
      .isString()
      .notEmpty()
      .withMessage('El nombre del superhéroe es obligatorio'),

    body('edad')
      .isInt({ min: 0 })
      .withMessage('La edad debe ser un número positivo'),

    body('poder')
      .isArray()
      .withMessage('Los poderes deben ser una lista')
      .custom((value) => {
        if (value.length === 0) {
          throw new Error('Los poderes no pueden estar vacíos');
        }
        return value.every((item) => typeof item === 'string');
      })
      .withMessage('Cada poder debe ser una cadena de texto'),

    body('habilidadEspecial')
      .isString()
      .notEmpty()
      .withMessage('La habilidad especial es obligatoria'),
  ];
};

// Reglas para actualizar un superhéroe
export const actualizarSuperheroeValidationRules = () => {
  return [
    param('id')
      .custom(validarObjectId)
      .withMessage('El ID debe ser un ObjectId válido'),

    body('nombreSuperHeroe')
      .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
      .isString()
      .notEmpty()
      .withMessage('El nombre del superhéroe debe ser una cadena no vacía'),

    body('edad')
      .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
      .isInt({ min: 0 })
      .withMessage('La edad debe ser un número positivo'),

    body('poder')
      .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
      .isArray()
      .withMessage('Los poderes deben ser una lista')
      .custom((value) => {
        if (value.length === 0) {
          throw new Error('Los poderes no pueden estar vacíos');
        }
        return value.every((item) => typeof item === 'string');
      })
      .withMessage('Cada poder debe ser una cadena de texto'),

    body('habilidadEspecial')
      .optional({ checkFalsy: true }) // Si el campo está vacío, no se valida
      .isString()
      .notEmpty()
      .withMessage('La habilidad especial es obligatoria'),
  ];
};
