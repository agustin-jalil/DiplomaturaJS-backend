//logica de negocio utilizando los metodos del repositorio para recuperar, bucar y filtrar datos de los superheroes 
import superHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerSuperheroePorId(id){
    return await superHeroRepository.obtenerPorId(id);

}

export async function obtenerTodosLosSuperheroes(){
    return await superHeroRepository.obtenerTodos();

}

export async function buscarSuperheroesPorAtributo(atributo,valor){
    return await superHeroRepository.buscarPorAtributo(atributo,valor);
}

export async function obtenerSuperheroesMayoresDe30(){
    return await superHeroRepository.obtenerMayoresDe30();
}

export async function crearSuperheroe(datosSuperheroe) {
    return await superHeroRepository.crear(datosSuperheroe);
}

export async function actualizarSuperheroe(id, datosActualizados) {
    return await superHeroRepository.actualizar(id, datosActualizados);
}

export async function eliminarSuperheroe(id) {
    return await superHeroRepository.eliminar(id);
}

export async function eliminarSuperheroePorNombre(nombre) {
    return await superHeroRepository.eliminarPorNombre(nombre);
}