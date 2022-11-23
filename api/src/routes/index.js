const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoutes = require("./PokemonRoutes.js");
const typeRoutes = require("./TypeRoutes.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// POKEMON
router.use("/pokemons", pokemonRoutes);
// TYPE
router.use("/types", typeRoutes);

module.exports = router;
