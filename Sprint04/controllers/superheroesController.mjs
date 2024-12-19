import Hero from '../models/SuperHero.mjs';
//gestionar las solicitudes HTTP , llamando a los servidores correspondientes y utilizando las vistas para presentar los datos 


import { obtenerSuperheroePorId, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, obtenerTodosLosSuperheroes, crearSuperheroe, actualizarSuperheroe, eliminarSuperheroe, eliminarSuperheroePorNombre } from "../services/superheroesService.mjs";

import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req,res){
    console.log("estamos en obtenerSuperheroePorIdController ");
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if(superheroe){
        res.render('editSuperhero', { title: 'Editar Superhéroe', superheroe });
    }else{
        res.status(404).send({mensaje:"Superheroe no encontrado"});
    }
}

export async function obtenerTodosLosSuperheroesController(req,res){
    try {
        const superheroes = await obtenerTodosLosSuperheroes(); // Obtiene los superhéroes de la base de datos o servicio
        console.log(superheroes.length)
        // Usamos res.render para renderizar la vista 'dashboard.ejs' y pasar los datos de los superheroes
        res.render('dashboard', { title: 'Dashboard', superheroes }); // Renderiza la vista y pasa los datos
    } catch (error) {
        console.error("Error al obtener los superhéroes:", error);
        res.status(500).send({ mensaje: "Error al cargar el dashboard" });
    }
}

export async function buscarSuperheroesPorAtributoController(req,res){
    const {atributo, valor} = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo,valor);

    if(superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes));
    }else{
        res.status(404).send({mensaje: "No se encontraron superheroes con ese atributo"})
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req,res) {
    console.log("entramos al controlador de mayores de 30")
    const superheroes = await obtenerSuperheroesMayoresDe30();
    console.log(superheroes)
    res.send(renderizarListaSuperheroes(superheroes));
}

export async function crearSuperheroeController(req,res){
    try {
        const nuevoSuperheroe = await crearSuperheroe(req.body);
        res.status(201).send(renderizarSuperheroe(nuevoSuperheroe));
    } catch (error) {
        res.status(500).send({ mensaje: "Error al crear el superhéroe", error });
    }
}

export async function actualizarSuperheroeController(req,res){
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (superheroeActualizado) {
            res.send(renderizarSuperheroe(superheroeActualizado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error });
    }
}

export async function eliminarSuperheroeController(req, res) {
    console.error("Encontro a --eliminarSuperheroeController--");
    
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);

        if (superheroeEliminado) {
            res.redirect('/api/heroes');
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al eliminar el superhéroe:', error);
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);

        if (superheroeEliminado) {
            res.send(renderizarSuperheroe(superheroeEliminado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error });
    }
}

//-----------------------------------------------------------------------------------------------------------------
export async function agregarSuperheroeController(req, res) {
    // const {
    //     nombreSuperHeroe,
    //     nombreReal,
    //     edad,
    //     planetaOrigen,
    //     debilidad,
    //     poder,
    //     aliado,
    //     enemigo
    // } = req.body;

    // // Convertir el campo poder en un arreglo
    // const poderes = poder ? poder.split(',').map(p => p.trim()) : [];

    // try {
    //     const nuevoHeroe = new Hero({
    //         nombreSuperHeroe,
    //         nombreReal,
    //         edad,
    //         planetaOrigen,
    //         debilidad,
    //         poder: poderes,
    //         aliado: aliado ? aliado.split(',').map(a => a.trim()) : [],
    //         enemigo: enemigo ? enemigo.split(',').map(e => e.trim()) : []
    //     });

    //     await nuevoHeroe.save();
    //     res.redirect('/api/heroes');
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).render('error', { title: 'Error del servidor', error });
    // }

    const {
        nombreSuperHeroe,
        nombreReal,
        edad,
        planetaOrigen,
        debilidad,
        poder,
        aliado,
        enemigo
    } = req.body;

    // Convertir los campos de poderes, aliados y enemigos en arrays
    const poderes = poder ? poder.split(',').map(p => p.trim()) : [];
    const aliados = aliado ? aliado.split(',').map(a => a.trim()) : [];
    const enemigos = enemigo ? enemigo.split(',').map(e => e.trim()) : [];

    const datosSuperheroe = {
        nombreSuperHeroe,
        nombreReal,
        edad,
        planetaOrigen,
        debilidad,
        poder: poderes,
        aliado: aliados,
        enemigo: enemigos
    };

    try {
        await crearSuperheroe(datosSuperheroe);
        res.redirect('/api/heroes');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { title: 'Error del servidor', error });
    }
}

export async function editarSuperheroeController(req, res) {
    console.log("estoy en el controlador: editarSuperheroeController ");
    const { id } = req.params;
    const {
        nombreSuperHeroe,
        nombreReal,
        edad,
        planetaOrigen,
        debilidad,
        poder,
        aliado,
        enemigo
    } = req.body;

    // Convertir los campos de poderes, aliados y enemigos en arrays
    const poderes = poder ? poder.split(',').map(p => p.trim()) : [];
    const aliados = aliado ? aliado.split(',').map(a => a.trim()) : [];
    const enemigos = enemigo ? enemigo.split(',').map(e => e.trim()) : [];

    try {
        const superheroeActualizado = await actualizarSuperheroe(id, {
            nombreSuperHeroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poder: poderes,
            aliado: aliados,
            enemigo: enemigos
        });

        if (superheroeActualizado) {
            res.redirect('/api/heroes');
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar el superhéroe:', error);
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error });
    }
}