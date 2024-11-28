import mongoose from 'mongoose';

const superHeroSchema = new mongoose.Schema({
  nombreSuperHeroe: { type: String, required: true },
  nombreReal: { type: String, required: true },
  nombreSociedad: { type: String, required: false }, // Campo opcional
  edad: { type: Number, required: true },
  planetaOrigen: { type: String, required: false }, // Campo opcional
  debilidad: { type: String, required: false }, // Campo opcional
  poder: { type: [String], required: true }, // Múltiples poderes
  habilidadEspecial: { type: String, default: 'Sin habilidad especial' },
  aliado: { type: [String], required: false }, // Aliados como array de strings
  enemigo: { type: [String], required: false }, // Enemigos como array de strings
}, { collection: 'Grupo-04' }); // Poner bien!!!*

const SuperHero = mongoose.model('Grupo-04', superHeroSchema);

export default SuperHero;
