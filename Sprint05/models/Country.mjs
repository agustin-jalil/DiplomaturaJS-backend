// models/Country.mjs
import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
  name: {
    common: String,
    official: String,
    nativeName: {
      spa: {
        official: String,
        common: String
      }
    }
  },
  independent: Boolean,
  status: String,
  unMember: Boolean,
  currencies: {
    [String]: {
      name: String,
      symbol: String
    }
  },
  capital: [String],
  region: String,
  subregion: String,
  languages: {
    spa: String
  },
  latlng: [Number],
  landlocked: Boolean,
  borders: [String],
  area: Number,
  flag: String,
  maps: {
    googleMaps: String,
    openStreetMaps: String
  },
  population: Number,
  gini: { type: Object, default: {} }, // Índice de Gini
  fifa: String,
  timezones: [String],
  continents: [String],
  flags: {
    png: String,
    svg: String,
    alt: String
  },
  startOfWeek: String,
  capitalInfo: {
    latlng: [Number]
  },
  creador: { type: String, default: 'Agustin Jalil Leon' }
}, { collection: 'Grupo-04' });

export default mongoose.model('Country', CountrySchema);