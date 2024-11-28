mongoose.connect('mongodb+srv://usuario:contraseña@cluster.mongodb.net/tuBaseDeDatos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-00' });

const SuperHeroe = mongoose.model('SuperHeroe', superheroSchema);

mongoose.connect('mongodb+srv://Grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conexión exitosa a MongoDB');

    // Aquí puedes comenzar a trabajar con tus datos
})
.catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});
