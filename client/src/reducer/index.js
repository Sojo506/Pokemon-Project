import {
  GET_POKEMONS,
  GET_POKEMON,
  GET_POKEMON_DETAIL,
  CREATE_POKEMON,
  GET_TYPES,
  FILTER_POKEMONS,
  GET_POKEMONS_API,
  GET_POKEMONS_DB
} from "../actions";

const initialState = {
  pokemons: [],
  auxPokemons: [],
  types: [],
  pokemon: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        auxPokemons: action.payload,
      };
    case GET_POKEMON:
      return {
        ...state,
        pokemons: action.payload
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemon: action.payload
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
      return {
        ...state,
        pokemons: action.payload,
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

    default:
      return state;
  }
}

export default rootReducer;
