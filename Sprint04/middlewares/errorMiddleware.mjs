// src/middleware/errorMiddleware.mjs
import { validationResult } from 'express-validator';

// Middleware para manejar errores de validación
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