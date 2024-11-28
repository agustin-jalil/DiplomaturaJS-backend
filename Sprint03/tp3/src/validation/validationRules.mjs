import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Mensajes de error
const errorMessages = {
  required: (field) => `${field} es requerido`,
  length: (field, min, max) => `${field} debe tener entre ${min} y ${max} caracteres`,
  positiveNumber: (field) => `${field} debe ser un número positivo`,
  validArray: (field) => `${field} debe ser un arreglo con al menos un elemento`,
  arrayItemLength: (field, min, max) => `Cada elemento de ${field} debe tener entre ${min} y ${max} caracteres`,
  validObjectId: 'El ID no es válido',
};

// Función para validar si un ID es válido en MongoDB
const validarObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(errorMessages.validObjectId);
  }
  return true;
};

// Reglas para crear un superhéroe
export const crearSuperheroeValidationRules = () => [
  body('nombreSuperHeroe')
    .trim()
    .notEmpty().withMessage(errorMessages.required('El nombre del superhéroe'))
    .isLength({ min: 3, max: 60 }).withMessage(errorMessages.length('El nombre del superhéroe', 3, 60)),

  body('nombreReal')
    .trim()
    .notEmpty().withMessage(errorMessages.required('El nombre real'))
    .isLength({ min: 3, max: 60 }).withMessage(errorMessages.length('El nombre real', 3, 60)),

  body('edad')
    .notEmpty().withMessage(errorMessages.required('La edad'))
    .isInt({ min: 0 }).withMessage(errorMessages.positiveNumber('La edad')),

  body('poder')
    .isArray({ min: 1 }).withMessage(errorMessages.validArray('El campo "poder"'))
    .custom((value) =>
      value.every((item) => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60)
    )
    .withMessage(errorMessages.arrayItemLength('poder', 3, 60)),

  body('habilidadEspecial')
    .trim()
    .notEmpty().withMessage(errorMessages.required('La habilidad especial')),
];

// Reglas para actualizar un superhéroe
export const actualizarSuperheroeValidationRules = () => [
  param('id')
    .custom(validarObjectId).withMessage(errorMessages.validObjectId),

  body('nombreSuperHeroe')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 60 }).withMessage(errorMessages.length('El nombre del superhéroe', 3, 60)),

  body('edad')
    .optional({ checkFalsy: true })
    .isInt({ min: 0 }).withMessage(errorMessages.positiveNumber('La edad')),

  body('poder')
    .optional({ checkFalsy: true })
    .isArray({ min: 1 }).withMessage(errorMessages.validArray('El campo "poder"'))
    .custom((value) =>
      value.every((item) => typeof item === 'string' && item.trim().length >= 3 && item.trim().length <= 60)
    )
    .withMessage(errorMessages.arrayItemLength('poder', 3, 60)),

  body('habilidadEspecial')
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty().withMessage(errorMessages.required('La habilidad especial')),
];

// Middleware para manejar los errores de validación
export const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Errores de validación',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};
