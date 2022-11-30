import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const GET_POKEMONS_API = "GET_POKEMONS_API";
export const GET_POKEMONS_DB = "GET_POKEMONS_DB";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";

export function getPokemons() {
  // GET ALL THE POKEMONS TO RENDER THEM ON HOME
  return async (dispatch) => {
    try {
      const response = await axios.get("/pokemons");
      if (response.data)
        dispatch({ type: GET_POKEMONS, payload: response.data });
      console.log("Trayendo Pokemons");
    } catch (error) {
      console.log("Not Found");
    }
  };
}

export function getPokemon(value) {
  // IT HELPS TO GET A POKEMON
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/pokemons/${value}`
      );
      if (response.data)
        dispatch({ type: GET_POKEMON, payload: response.data });
      console.log("Trayendo Pokemons");
    } catch (error) {
      alert("Error");
    }
  };
}

export function getPokemonDetail(value) {
  // SHOW THE POKEMON'S DETAILS
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/pokemons/${value}`
      );
      if (response.data)
        dispatch({ type: GET_POKEMON_DETAIL, payload: response.data });
      console.log("Trayendo Pokemons");
    } catch (error) {
      alert("Error");
    }
  };
}

export function createPokemon(pokemon) {
  // CREATE A POKEMON
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/pokemons`,
        pokemon
      );
      if (response.data)
        dispatch({ type: CREATE_POKEMON, payload: response.data });
    } catch (error) {
      alert("Error");
    }
  };
}

export function filterPokemons(filter, value) {
  // FILTER BY NAME, ATTACK OR TYPE
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/pokemons?${filter}=${value}`
      );
      if (response.data)
        dispatch({ type: FILTER_POKEMONS, payload: response.data });
    } catch (error) {
      alert("Error");
    }
  };
}

export function existingPokemons() {
  // GET ALL OF THE CREATED POKEMONS FROM API
  return async (dispatch) => {
    try {
      const response = await axios.get("/pokemons/api");
      if (response.data)
        dispatch({ type: GET_POKEMONS_API, payload: response.data });
    } catch (error) {
      alert("Error");
    }
  };
}

export function createdPokemons() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/pokemons/db");
      if (response.data)
        dispatch({ type: GET_POKEMONS_DB, payload: response.data });
    } catch (error) {
      alert("Error");
    }
  };
}

export function getTypes() {
  // GET ALL THE POKEMON'S TYPES
  return async (dispatch) => {
    try {
      const response = await axios.get("/types");
      if (response.data) dispatch({ type: GET_TYPES, payload: response.data });
    } catch (error) {
      alert("Error");
    }
  };
}
