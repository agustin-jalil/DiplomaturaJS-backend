import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroRepository extends IRepository{
    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo,valor){
        const query= {[atributo]: new RegExp(valor,'i')};
        return await SuperHero.find(query);
    }
    
    async obtenerMayoresDe30(){
        // return await SuperHero.find({edad:{ $gt: 30}, planetaOrigen: 'Tierra', poder: {$size:{$gte:2}}});
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: 'Tierra',
            poder: { $exists: true, $not: {$size: 0} }, // Asegúrate de que la lista de poderes exista y tenga elementos
            "poder.1": { $exists: true } // Verifica que haya al menos dos poderes
        });
    }

    async crear(datosSuperheroe) {
        const nuevoSuperheroe = new SuperHero(datosSuperheroe);
        return await nuevoSuperheroe.save();
    }

    async actualizar(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });//busca el superhéroe por id, aplica los cambios contenidos en datosActualizados y usa { new: true } para devolver el documento actualizado.
    }

    async eliminar(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    async eliminarPorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }

}

export default new SuperHeroRepository();