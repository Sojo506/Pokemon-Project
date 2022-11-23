export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const GET_POKEMONS_API = "GET_POKEMONS_API";
export const GET_POKEMONS_DB = "GET_POKEMONS_DB";

export function getPokemons() {
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS, payload: json });
      });
  };
}

export function getPokemon(value) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/pokemons?name=${value}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMON, payload: json });
      });
  };
}

export function filterPokemons(filter, value) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/pokemons?${filter}=${value}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: FILTER_POKEMONS, payload: json });
      });
  };
}
export function existingPokemons() {
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons/api")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS_API, payload: json });
      });
  };
}
export function createdPokemons() {
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons/db")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS_DB, payload: json });
      });
  };
}

export function getTypes() {
  return function (dispatch) {
    return fetch("http://localhost:3001/types")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_TYPES, payload: json });
      });
  };
}