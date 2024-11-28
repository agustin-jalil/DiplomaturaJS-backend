import SuperHero from '../models/SuperHero.mjs'; // Asegúrate de que la ruta sea correcta

// Obtener todos los superhéroes
export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    const superHeroes = await SuperHero.find();
    if (!superHeroes || superHeroes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron superhéroes' });
    }
    res.status(200).json(superHeroes);
  } catch (err) {
    console.error('Error al obtener los superhéroes:', err);
    res.status(500).json({ error: 'Error al obtener los superhéroes' });
  }
};

// Crear un nuevo superhéroe
export const crearSuperheroeController = async (req, res) => {
  try {
    const { nombreSuperHeroe, edad, poder, habilidadEspecial } = req.body;

    // Verificar que los campos requeridos estén presentes
    if (!nombreSuperHeroe || !edad || !poder || !habilidadEspecial) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Validar que poder sea un arreglo
    if (!Array.isArray(poder)) {
      return res.status(400).json({ error: 'El campo "poder" debe ser un arreglo' });
    }

    const nuevoSuperHeroe = new SuperHero(req.body);
    await nuevoSuperHeroe.save();
    res.status(201).json(nuevoSuperHeroe);
  } catch (err) {
    console.error('Error al crear el superhéroe:', err);
    res.status(500).json({ error: 'Error al crear el superhéroe' });
  }
};

// Actualizar un superhéroe
export const actualizarSuperheroeController = async (req, res) => {
  try {
    const superHero = await SuperHero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!superHero) {
      return res.status(404).json({ message: 'Superhéroe no encontrado' });
    }
    res.status(200).json(superHero);
  } catch (err) {
    console.error('Error al actualizar el superhéroe:', err);
    res.status(500).json({ error: 'Error al actualizar el superhéroe' });
  }
};

// Eliminar un superhéroe por ID
export const eliminarSuperheroePorIdController = async (req, res) => {
  try {
    const superHero = await SuperHero.findByIdAndDelete(req.params.id);
    if (!superHero) {
      return res.status(404).json({ message: 'Superhéroe no encontrado' });
    }
    res.status(200).json(superHero);
  } catch (err) {
    console.error('Error al eliminar el superhéroe por ID:', err);
    res.status(500).json({ error: 'Error al eliminar el superhéroe por ID' });
  }
};

// Eliminar un superhéroe por nombre
export const eliminarSuperheroePorNombreController = async (req, res) => {
  try {
    const superHero = await SuperHero.findOneAndDelete({ nombreSuperHeroe: req.params.nombreSuperHeroe });
    if (!superHero) {
      return res.status(404).json({ message: 'Superhéroe no encontrado' });
    }
    res.status(200).json(superHero);
  } catch (err) {
    console.error('Error al eliminar el superhéroe por nombre:', err);
    res.status(500).json({ error: 'Error al eliminar el superhéroe por nombre' });
  }
};
