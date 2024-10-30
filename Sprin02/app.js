const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect('mongodb+srv://grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js')
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

// Definir el esquema para Superhéroes
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
}, { collection: 'Grupo-04' });

// Crear el modelo
const SuperHero = mongoose.model('SuperHero', superheroSchema);

// Función para insertar un nuevo superhéroe
async function insertSuperHero() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde']
    });

    try {
        await hero.save();
        console.log('Superhéroe insertado:', hero);
    } catch (error) {
        console.error('Error al insertar el superhéroe:', error);
    }
}


// Función para actualizar un superhéroe por su nombre
async function updateSuperHero(nombreSuperHeroe) {
    try {
        // Actualizar la edad del superhéroe
        const result = await SuperHero.updateOne(
            { nombreSuperHeroe: nombreSuperHeroe }, // Filtrar por nombre del superhéroe
            { $set: { edad: 26 } } // Actualizar la edad
        );

        if (result.modifiedCount > 0) {
            // Buscar el superhéroe actualizado para mostrar sus detalles
            const updatedHero = await SuperHero.findOne({ nombreSuperHeroe: nombreSuperHeroe });
            console.log('Superhéroe actualizado:', updatedHero);
        } else {
            console.log('Superhéroe no encontrado o no se realizaron cambios');
        }
    } catch (error) {
        console.error('Error al actualizar el superhéroe:', error);
    }
}


// Función para encontrar todos los superhéroes
async function findSuperHeroes() {
    try {
        const heroes = await SuperHero.find();
        console.log('Superhéroes encontrados:', heroes);
    } catch (error) {
        console.error('Error al encontrar superhéroes:', error);
    }
}

async function deleteSuperHero(nombreSuperHeroe) {
    try {
        // Realiza la eliminación del superhéroe utilizando el nombre proporcionado
        const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });

        // Verifica si se eliminó algún documento
        if (result.deletedCount === 0) {
            console.log(`No se encontró ningún superhéroe con el nombre: ${nombreSuperHeroe}`);
        } else {
            console.log(`Superhéroe eliminado:`, result);
        }
    } catch (error) {
        console.error('Error al eliminar el superhéroe:', error);
    }
}



// Función principal
async function main() {
    await insertSuperHero();  // Inserta un nuevo superhéroe
    await findSuperHeroes();   // Muestra todos los superhéroes
    await updateSuperHero('Spiderman'); // Actualiza el superhéroe 'Spiderman'
    await deleteSuperHero('Spiderman'); // Elimina el superhéroe 'Spiderman'
    await findSuperHeroes();   // Muestra todos los superhéroes después de la actualización y eliminación
}

// Ejecutar la función principal
main().catch(console.error); // Captura y muestra errores en la consola