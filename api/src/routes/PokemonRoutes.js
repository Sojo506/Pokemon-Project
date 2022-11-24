const { Router } = require("express");
const {
  getPokemons,
  getPokemonsByApi,
  getPokemonsByDb,
  getPokemonByIdOrName,
  createPokemon,
} = require("../controllers/PokemonController");
const router = Router();

// POKEMONS
router.get("/", getPokemons);
router.get("/api", getPokemonsByApi);
router.get("/db", getPokemonsByDb);
router.get("/:id", getPokemonByIdOrName);
router.post("/", createPokemon);

module.exports = router;
