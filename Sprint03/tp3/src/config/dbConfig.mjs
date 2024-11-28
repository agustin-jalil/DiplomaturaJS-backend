// src/config/dbConfig.mjs
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://Grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js', {
      serverSelectionTimeoutMS: 30000, // 30 segundos
    });
    console.log('Conexión a la base de datos establecida con éxito');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Detener el proceso si no se puede conectar
  }
};
