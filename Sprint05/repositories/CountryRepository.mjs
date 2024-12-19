// repositories/CountryRepository.js
import Country from '../models/Country.mjs';
import IRepository from "./IRepository.mjs";


//------------------------------------------------------------------------------------------------------------------------------//
class CountryRepository extends IRepository {

  async crear(datosPais) {
    return await Country.create(datosPais);
  }

  async obtenerTodos() {
    return await Country.find({});
  }

  async obtenerPorId(id) {
    return await Country.findById(id);
  }

  async actualizar(id, datosActualizados) {
    return await Country.findByIdAndUpdate(id, datosActualizados, { new: true });
  }

  async eliminar(id) {
    return await Country.findByIdAndDelete(id);
  }

}

export const countryRepository = new CountryRepository();





