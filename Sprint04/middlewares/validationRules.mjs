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
  console.log("esta en validarObjectId");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(errorMessages.validObjectId);
  }
  
  return true;
};

// Reglas para crear un superhéroe
export const crearSuperheroeValidationRules = () => {
  return [
    // Validación para nombreSuperHeroe
    body('nombreSuperHeroe')
      .trim()
      .notEmpty().withMessage('El nombre del superhéroe es requerido')
      .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),

    // Validación para nombreReal
    body('nombreReal')
      .trim()//eliminar espacio en blanco 
      .notEmpty().withMessage('El nombre real es requerido')
      .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),

    // Validación para edad
    body('edad')
      .notEmpty().withMessage('La edad es requerida')
      .isNumeric().withMessage('La edad debe ser un número')
      .custom(value => value >= 0).withMessage('La edad no puede ser negativa'),

    // Validación para poder (debe ser un array con los requisitos dados)
    body('poder')
    .custom(value => {
        if (typeof value === 'string') {
            const poderes = value.split(',').map(p => p.trim());
            return poderes.every(item => typeof item === 'string' && item.length >= 3 && item.length <= 60);
        }
        return false;
    }).withMessage('Cada poder debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco'),

  ];
};
// Reglas para actualizar un superhéroe
export const actualizarSuperheroeValidationRules = () => {
  return [
    param('id')
      .custom(validarObjectId)
      .withMessage('El ID debe ser un ObjectId válido'),

    body('nombreSuperHeroe')
      .optional()
      .if(body('nombreSuperHeroe').exists())
      .trim()
      .notEmpty().withMessage('El nombre del superhéroe es requerido')
      .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),

    body('nombreReal')
      .optional()
      .if(body('nombreReal').exists())
      .trim()
      .notEmpty().withMessage('El nombre real es requerido')
      .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),

    body('edad')
      .optional()
      .if(body('edad').exists())
      .trim()
      .notEmpty().withMessage('La edad es requerida')
      .isNumeric().withMessage('La edad debe ser un número')
      .custom(value => value >= 0).withMessage('La edad no puede ser negativa'),

    body('poder')
      .optional()
      .if(body('poder').exists())
      .isArray().withMessage('El campo "poder" debe ser un arreglo')
      .custom(array => array.length > 0).withMessage('El array de poderes no puede estar vacío')
      .custom(value => value.every(item => 
        typeof item === 'string' && 
        item.trim().length >= 3 && 
        item.trim().length <= 60 &&
        item.trim() === item
      )).withMessage('Cada poder debe ser una cadena de texto entre 3 y 60 caracteres, sin espacios en blanco')

  ];
};
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