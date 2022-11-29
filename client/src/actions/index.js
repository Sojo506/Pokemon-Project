export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const GET_POKEMONS_API = "GET_POKEMONS_API";
export const GET_POKEMONS_DB = "GET_POKEMONS_DB";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";

export function getPokemons() { // GET ALL THE POKEMONS TO RENDER THEM ON HOME
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS, payload: json });
      });
  };
}

export function getPokemon(value) { // IT HELPS TO GET A POKEMON
  try {
    return function (dispatch) {
      return fetch(`http://localhost:3001/pokemons/${value}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          dispatch({ type: GET_POKEMON, payload: json });
        });
    };
  } catch (error) {
    console.log("Not Found");
  }
}

export function getPokemonDetail(value) { // SHOW THE POKEMON'S DETAILS
  try {
    return function (dispatch) {
      return fetch(`http://localhost:3001/pokemons/${value}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          dispatch({ type: GET_POKEMON_DETAIL, payload: json });
        });
    };
  } catch (error) {
    console.log("Not Found");
  }
}

export function createPokemon(pokemon) { // CREATE A POKEMON
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons", {
      method: "POST",
      body: JSON.stringify({...pokemon}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch({ type: CREATE_POKEMON, payload: json });
      });
  };
}

export function filterPokemons(filter, value) { // FILTER BY NAME, ATTACK OR TYPE
  return function (dispatch) {
    return fetch(`http://localhost:3001/pokemons?${filter}=${value}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: FILTER_POKEMONS, payload: json });
      });
  };
}

export function existingPokemons() { // GET ALL OF THE CREATED POKEMONS FROM API
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons/api")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS_API, payload: json });
      });
  };
}

export function createdPokemons() { // GET ALL OF THE CREATED POKEMONS FROM DB
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons/db")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS_DB, payload: json });
      });
  };
}

export function getTypes() { // GET ALL THE POKEMON'S TYPES
  return function (dispatch) {
    return fetch("http://localhost:3001/types")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_TYPES, payload: json });
      });
  };
}