// src/views/responseView.mjs
export function renderizarSuperheroe(superheroe) {
  return {
    ID: superheroe.id,
    Nombre: superheroe.nombreSuperHeroe,
    "Nombre Real": superheroe.nombreReal,
    Edad: superheroe.edad,
    "Planeta de Origen": superheroe.planetaOrigen,
    Debilidad: superheroe.debilidad,
    Poder: superheroe.poder, // Cambio de 'poderes' a 'poder'
    Aliados: superheroe.aliados,
    Enemigos: superheroe.enemigos,
  };
}

export function renderizarListaSuperheroes(superheroes) {
  return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}
