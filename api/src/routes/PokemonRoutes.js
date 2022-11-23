const { Router } = require("express");
const {
  getPokemons,
  getPokemonsByApi,
  getPokemonsByDb,
  getPokemon,
  createPokemon,
} = require("../controllers/PokemonController");
const router = Router();

// POKEMONS
router.get("/", getPokemons);
router.get("/api", getPokemonsByApi);
router.get("/db", getPokemonsByDb);
router.get("/:id", getPokemon);
router.post("/", createPokemon);

module.exports = router;
