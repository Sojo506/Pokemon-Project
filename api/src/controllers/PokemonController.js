const { Pokemon, Type, Type_Pokemon } = require("../db");
const axios = require("axios");

// ================= FUNCTIONS ===================
// GET POKEMONS FROM THE API
const getPokemonsApi = async () => {
  // KEEP POKEMONES
  const pokemons = [];

  // SEARCH POKEMOS BY THE API
  const data = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=40")
    .then((response) => response.data.results) // GET INTO RESULTS ARRAY (WHERE ARE POKEMONS)
    .then((pokemon) => pokemon);

  // GET THE URL TO DO A SUBREQUEST
  const urls = data.map((d) => axios.get(d.url)); // PENDING

  // RESOLVED THEM ALREADY AND GET DATA FROM THEM
  const pokemonsApi = await axios.all(urls).then((pokemon) => {
    pokemon.map((p) => {
      pokemons.push({
        id: p.data.id,
        name: p.data.name.charAt(0).toUpperCase() + p.data.name.slice(1),
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        height: p.data.height,
        weight: p.data.weight,
        image: p.data.sprites.other.dream_world.front_default,
        types: p.data.types.map((e) => e.type.name),
      });
    });
  });

  return pokemons;
};

// GET POKEMONS FROM DB
const getPokemonsDb = async () => {
  const getter = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return getter;
};

const getBothPokemons = async () => {
  const pokemonsApi = await getPokemonsApi();
  const pokemonsDb = await getPokemonsDb();
  const pokemons = pokemonsApi.concat(pokemonsDb);
  return pokemons;
};

// ================= HTTP METHODS ===================
// GET /pokemons
const getPokemons = async (req, res) => {
  const { filter, type } = req.query;
  try {
    const pokemons = await getBothPokemons();

    // FILTER BY ORDER
    if (filter) {
      if (filter === "asc") {
        // ASCENDING A-Z
        return res.json(
          pokemons.sort((a, b) => {
            let aux;
            a.name.toUpperCase() < b.name.toUpperCase()
              ? (aux = -1)
              : a.name.toUpperCase() > b.name.toUpperCase()
              ? (aux = 1)
              : (aux = 0);
            return aux;
          })
        );
      }

      return res.json(
        // DESCENDING Z-A
        pokemons.sort((a, b) => {
          let aux;
          b.name.toUpperCase() < a.name.toUpperCase()
            ? (aux = -1)
            : b.name.toUpperCase() > a.name.toUpperCase()
            ? (aux = 1)
            : (aux = 0);
          return aux;
        })
      );
    }

    // FILTER BY TYPE
    if (type) {
      console.log(Type_Pokemon);
      // TO DO: FILTER BY TYPE
      return res.json(
        pokemons.filter((p) => {
          return p.id.length === 36
            ? p.types.some((t) => t.name === type)
            : p.types.includes(type);
        })
      );
    }

    res.json(pokemons);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

// GET /pokemons/api
const getPokemonsByApi = async (req, res) => {
  try {
    return res.json(await getPokemonsApi());
  } catch (error) {
    res.status(404).send(error);
  }
};
// GET /pokemons/db
const getPokemonsByDb = async (req, res) => {
  try {
    return res.json(await getPokemonsDb());
  } catch (error) {
    res.status(404).send(error);
  }
};

// GET /pokemons/:id(/:name)
const getPokemonByIdOrName = async (req, res) => {
  const { id } = req.params;
  if (id.length === 36) {
    console.log("Buscando en DB");
    const pokemonDb = await Pokemon.findOne({
      where: {
        id,
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return res.json([{ ...pokemonDb._previousDataValues }]);
  }
  try {
    console.log("Buscando en API");
    const data = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.data);
    const pokemon = {};
    pokemon["id"] = data.id;
    pokemon["name"] = data.name;
    pokemon["hp"] = data.stats[0].base_stat;
    pokemon["attack"] = data.stats[1].base_stat;
    pokemon["defense"] = data.stats[2].base_stat;
    pokemon["speed"] = data.stats[5].base_stat;
    pokemon["height"] = data.height;
    pokemon["weight"] = data.weight;
    pokemon["image"] = data.sprites.other.dream_world.front_default;
    pokemon["types"] = data.types.map((e) => e.type.name);

    res.json([{ ...pokemon }]);
  } catch (error) {
    res.status(404).send("Not Found");
  }
};

// POST /pokemons
const createPokemon = async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;
  console.log(req.body);
  try {
    if (
      !name ||
      !hp ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !types.length
    ) {
      throw new Error("Some parameters are missing");
    }

    const poke = await Pokemon.create({
      name,
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
      speed: parseInt(speed),
      height: parseInt(height),
      weight: parseInt(weight),
    });

    const typesDb = await Type.findAll({ where: { name: types } });
    poke.addType(typesDb);

    return res.json(poke);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPokemons,
  getPokemonsByApi,
  getPokemonsByDb,
  getPokemonByIdOrName,
  createPokemon,
};
