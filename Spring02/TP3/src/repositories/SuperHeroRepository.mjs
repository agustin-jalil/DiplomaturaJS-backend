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
}

export default new SuperHeroRepository();