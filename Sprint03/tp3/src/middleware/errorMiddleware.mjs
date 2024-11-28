import { validationResult } from 'express-validator';

/**
 * Middleware para manejar errores de validación.
 * Verifica si hay errores en la validación de los datos enviados al servidor
 * y retorna una respuesta consistente con el estado de los errores.
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Errores de validación detectados',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
        location: err.location, // Proporciona información adicional sobre la ubicación del error
      })),
    });
  }

  next();
};
