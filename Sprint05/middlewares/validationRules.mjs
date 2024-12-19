// middlewares/validationRules.mjs
import { body, validationResult } from 'express-validator';

// Reglas de validación para crear/editar un país
export const crearEditarPaisValidationRules = () => [
  body('name_common')
    .notEmpty().withMessage('El nombre común es obligatorio')//verifica que el campo no este vacio 
    .isLength({ min: 3, max: 90 }).withMessage('El nombre común debe tener entre 3 y 90 caracteres'),

  body('name_official')
    .notEmpty().withMessage('El nombre oficial es obligatorio')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),

  body('capital')
    .notEmpty().withMessage('La capital es obligatoria')
    .custom((value) => {
      const capitals = value.split(',').map(cap => cap.trim());//Divido el valor en una lista (usando comas como separadores).
      //Elimino espacios innecesarios con trim.
      return capitals.every(cap => cap.length >= 3 && cap.length <= 90);
    }).withMessage('Cada capital debe tener entre 3 y 90 caracteres'),//Verifico que cada nombre de capital tenga entre 3 y 90 caracteres.

  body('area')
    .notEmpty().withMessage('El área es obligatoria')
    .isNumeric().withMessage('El área debe ser un número')
    .custom(value => value > 0).withMessage('El área debe ser un número positivo'),

  body('population')
    .notEmpty().withMessage('La población es obligatoria')
    .isInt({ min: 1 }).withMessage('La población debe ser un número entero positivo'),

  body('gini')
    .optional()
    .isNumeric().withMessage('El índice Gini debe ser un número')
    .custom(value => value >= 0 && value <= 100).withMessage('El índice Gini debe estar entre 0 y 100'),

  body('timezones')
    .notEmpty().withMessage('Las zonas horarias son obligatorias'),

  body('borders')
    .optional()
    .custom((value) => {
      if (!value) return true;
      const borders = value.split(',').map(border => border.trim());
      return borders.every(border => border.length === 3 && /^[A-Z]+$/.test(border));
    }).withMessage('Cada código de país en las fronteras debe ser una cadena de 3 letras mayúsculas')
];

// Middleware para validar errores
export const validar = (req, res, next) => {
  const errors = validationResult(req);//Recolecta los errores generados por las validaciones anteriores.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();//Si no hay errores, pasa al siguiente middleware o manejador usando next().
};
