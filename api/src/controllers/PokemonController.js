const { Pokemon, Type, Type_Pokemon } = require("../db");
const axios = require("axios");

// GET POKEMONS FROM THE API
const getPokemonsApi = async () => {
  // KEEP POKEMONES
  const pokemons = [];

  // SEARCH POKEMOS BY THE API
  const data = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=12")
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
        hp: p.data.stats.find((s) => s.stat.name === "hp").base_stat,
        attack: p.data.stats.find((s) => s.stat.name === "attack").base_stat,
        defense: p.data.stats.find((s) => s.stat.name === "defense").base_stat,
        speed: p.data.stats.find((s) => s.stat.name === "speed").base_stat,
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
  const getter = await Pokemon.findAll();
  return getter;
};

const getBothPokemons = async () => {
  const pokemonsApi = await getPokemonsApi();
  const pokemonsDb = await getPokemonsDb();
  const pokemons = pokemonsApi.concat(pokemonsDb);
  return pokemons;
};

// GET /pokemons
const getPokemons = async (req, res) => {
  const { name, filter, type } = req.query;
  try {
    const pokemons = await getBothPokemons();

    if (name) {
      const pokeName = pokemons.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      if (pokeName) return res.json(pokeName);
    }

    if (filter) {
      if (filter === "ASC") {
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

    if (type) {
      console.log(Type_Pokemon);

      // TO DO: FILTER BY TYPE
      /* const aux = type
        .toString()
        .split("")
        .slice(1, type.length - 1)
        .join("")
        .split(",");

      return res.json(
        pokemons.filter((p) => {
          return p.types.some((t) => {
            return aux.includes(t);
          });
        })
      ); */
    }

    res.json(pokemons);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error)
  }
};

// GET /pokemons/:id
const getPokemon = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemons = await getBothPokemons();
    const pk = pokemons.filter((p) => p.id == id);
    if (!pk.length) throw new Error("Some error happened");

    res.json(pk);
  } catch (error) {
    console.log(error);
  }
};

// POST /pokemons
const createPokemon = async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;

  if (!name || !hp || !attack || !defense || !speed || !height || !weight)
    throw new Error("Some parameters are missing");

  try {
    const poke = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
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
  getPokemon,
  createPokemon,
};
