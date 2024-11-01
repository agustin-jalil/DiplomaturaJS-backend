//gestionar las solicitudes HTTP , llamando a los servidores correspondientes y utilizando las vistas para presentar los datos 


import { obtenerSuperheroePorId, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, obtenerTodosLosSuperheroes } from "../services/superheroesService.mjs";

import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req,res){
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje:"Superheroe no encontrado"});
    }
}

export async function obtenerTodosLosSuperheroesController(req,res){
    const superheroes = await obtenerTodosLosSuperheroes();
    console.log(superheroes.length)
    res.send(renderizarListaSuperheroes(superheroes));
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