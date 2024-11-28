//inicializar el servidor , conectar con la BD y cargas las rutas para gestionar todas las solicitudes relacionadas con los superheroes
import express from 'express';
import {connect} from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT =  3000;

//Moddleware para parsear JSON
app
.use(express.json());

//conexion a MongoDB
connect();

//configuracion de rutas
app.use('/api', superHeroRoutes);

//Manejo de errores para rutas no encontradas 
app.use((req,res)=>{
    res.status(404).send({mensaje: "Ruta no encontrada"});
});

//iniciar el servidor 
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

