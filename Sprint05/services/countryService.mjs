// services/CountryService.mjs
import axios from 'axios';
import { countryRepository } from '../repositories/CountryRepository.mjs';

const apiUrl = 'https://restcountries.com/v3.1/lang/spanish';
// https://restcountries.com/v3.1/lang/spanish


// Consumo y devuelvo los países
//Axios, una biblioteca de JavaScript para realizar solicitudes HTTP.
async function getCountries() {
  try {
    const response = await axios.get(apiUrl); //solicitud HTTP GET a la URL de la API especificada por apiUrl.
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de países:', error);
    throw error;
  }
}

// Filtro los países
function filterSpanishSpeakingCountries(countries) {
  return countries.filter(country => country.languages && country.languages.spa === 'Spanish');//idioma español presente 
}

// Proceso los países para luego guardar en la base de datos
// Selecciono los campos de interés
//Aseguro que todos los objetos sigan una estructura consistente.
function processCountries(countries) {
  return countries.map(country => {
    const {
      name,
      independent,
      status,
      unMember,
      currencies,
      capital,
      region,
      subregion,
      latlng,
      landlocked,
      borders,
      area,
      flag,
      maps,
      population,
      gini,
      fifa,
      timezones,
      continents,
      flags,
      startOfWeek,
      capitalInfo
    } = country;

    return {
      name: {
        common: name.common,
        official: name.official,
        nativeName: {
          spa: {
            official: name.nativeName.spa.official,
            common: name.nativeName.spa.common
          }
        }
      },
      independent,
      status,
      unMember,
      currencies,
      capital,
      region,
      subregion,
      languages: {
        spa: 'Spanish'
      },
      latlng,
      landlocked,
      borders,
      area,
      flag,
      maps,
      population,
      gini: gini ? gini : {}, // aseguro de que el campo gini se incluya
      fifa,
      timezones,
      continents,
      flags,
      startOfWeek,
      capitalInfo,
      creador: 'Agustin Jalil Leon' // añado el campo creador
    };
  });
}

// Guardo en la base de datos
async function saveCountriesToDB(countries) {
  try {
    await countryRepository.crear(countries);
    console.log('Países guardados en la base de datos');
  } catch (error) {
    console.error('Error al guardar los países en la base de datos:', error);
    throw error;
  }
}

// Utilizo todas las funciones y guardo en la base de datos
export async function fetchAndStoreCountries() {
  const countries = await getCountries();
  const spanishSpeakingCountries = filterSpanishSpeakingCountries(countries);
  const processedCountries = processCountries(spanishSpeakingCountries);
  await saveCountriesToDB(processedCountries);
}

//--------------------------------------------------------------------------------------------------------------------------//
// Obtener todos los países
export async function obtenerTodosLosPaises() {
  return await countryRepository.obtenerTodos();
}

// Agregar un nuevo país
export async function agregarPais(nuevoPais) {
  return await countryRepository.crear(nuevoPais);
}

// Obtener un país por ID
export async function obtenerPaisPorId(id) {
  return await countryRepository.obtenerPorId(id);
}

// Actualizar un país
export async function actualizarPais(id, datosActualizados) {
  return await countryRepository.actualizar(id, datosActualizados);
}

// Eliminar un país
export async function eliminarPais(id) {
  return await countryRepository.eliminar(id);
}
