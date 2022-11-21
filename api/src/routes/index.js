const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getPokemons,
  getPokemon,
  createPokemon
} = require('../controllers/PokemonController');

const {
  getTypes
} = require('../controllers/TipoController')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// POKEMONS
router.get('/pokemons', getPokemons)
router.get('/pokemons/:id', getPokemon)
router.post('/pokemons', createPokemon)

// TYPES
router.get('/types', getTypes)
module.exports = router;
