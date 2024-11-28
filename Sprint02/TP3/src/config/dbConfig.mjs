//configuracion y conexion centralizada con MongoDB
//permite tener una unica instancia de conexion para ser utilizadda en cualquier parte del proyecto 

import mongoose from 'mongoose';

export async function connect(){
    try {
        await mongoose.connect(
            'mongodb+srv://Grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js',{
                useNewUrlParser: true,
                useUnifiedTopology:true
            }
        );

        console.log('Conexion exitosa a MongoDB');

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}