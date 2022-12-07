import {
  GET_POKEMONS,
  GET_POKEMON,
  GET_POKEMON_DETAIL,
  CREATE_POKEMON,
  GET_TYPES,
  FILTER_POKEMONS,
  GET_POKEMONS_API,
  GET_POKEMONS_DB,
  CLEAR_POKEMON,
} from "../actions";

const initialState = {
  pokemons: [],
  pokemonsDouble: [],
  types: [],
  pokemon: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: state.pokemons.length ? state.pokemons : action.payload,
        pokemonsDouble: action.payload,
      };
    case GET_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemon: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_POKEMONS:
      let auxPokemons = [...state.pokemons];
      const [filter, value] = action.payload;

      // FILTER BY ORDER
      if (value === "all") auxPokemons = state.pokemonsDouble;

      if (filter === "filter" && value !== "all") {
        if (value === "asc") {
          // ASCENDING A-Z
          auxPokemons.sort((a, b) => {
            let aux;
            a.name.toUpperCase() < b.name.toUpperCase()
              ? (aux = -1)
              : a.name.toUpperCase() > b.name.toUpperCase()
              ? (aux = 1)
              : (aux = 0);
            return aux;
          });
        }

        // DESCENDING Z-A
        if (value === "desc") {
          auxPokemons.sort((a, b) => {
            let aux;
            b.name.toUpperCase() < a.name.toUpperCase()
              ? (aux = -1)
              : b.name.toUpperCase() > a.name.toUpperCase()
              ? (aux = 1)
              : (aux = 0);
            return aux;
          });
        }
      }

      // FILTER BY ATTACK
      if (filter === "attack" && value !== "all") {
        if (value === "asc") {
          // ASCENDING
          auxPokemons.sort((a, b) => a.attack - b.attack);
        }
        if (value === "desc") {
          // DESCENDING
          auxPokemons.sort((a, b) => b.attack - a.attack);
        }
      }

      if (filter === "type" && value !== "all") {
        // TO DO: FILTER BY TYPE
        auxPokemons = state.pokemonsDouble.filter((p) => {
          return p.id.length === 36
            ? p.types.some((t) => t.name === value)
            : p.types.includes(value);
        });
      }

      return {
        ...state,
        pokemons: auxPokemons,
      };
    case GET_POKEMONS_API:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_POKEMONS_DB:
      return {
        ...state,
        pokemons: action.payload,
      };
    case CLEAR_POKEMON:
      return {
        ...state,
        pokemon: {},
      };
    default:
      return state;
  }
}

export default rootReducer;
