//funciones para presentacion de los datos, organiza la informacion de los superheroes en un formato estrcuturado 
export function renderizarSuperheroe(superheroe){
    return {
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta de Orgien": superheroe.planetaOrigen,
        Debilidades: superheroe.debilidad,
        Poderes: superheroe.poder,
        Aliados: superheroe.aliado,
        Enemigos: superheroe.enemigo
    };
}

export function renderizarListaSuperheroes(superheroes){
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}

