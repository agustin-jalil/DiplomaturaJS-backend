// src/models/SuperHero.mjs
import mongoose from 'mongoose';

const superHeroSchema = new mongoose.Schema({
  nombreSuperHeroe: { type: String, required: true },
  edad: { type: Number, required: true },
  poder: { type: [String], required: true },
  habilidadEspecial: { type: String, required: true },
}, { collection: 'Grupo-04' });


// Creación del modelo de SuperHero usando el esquema definido
const SuperHero = mongoose.model('Grupo-04', superHeroSchema);

// Exportación del modelo para usarlo en otros archivos
export default SuperHero;
