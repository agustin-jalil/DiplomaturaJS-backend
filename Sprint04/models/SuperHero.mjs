//definimos el modelo de datos para superheroes, ademas establecemos las reglas de validacion
import mongoose from 'mongoose';

//esquema para los superheroes
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type:String , required:true},
    nombreReal:{type:String, required:true} ,
    edad : {type:Number, min:0},
    planetaOrigen: {type: String, default:'Desconocido'},
    debilidad : String,
    poder: [String],
    aliado:[String],
    enemigo: [String ],
    createdAt: {type:Date, default: Date.now},
    creador: { type: String, default: 'De La Fuente Gonzalo' }
    }, { collection: 'Grupo-04' });// Aquí defino la coleccion del grupo 

export default mongoose.model('SuperHero', superheroSchema);