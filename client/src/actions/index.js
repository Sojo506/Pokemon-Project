export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";

export function getPokemons() {
  return function (dispatch) {
    return fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS, payload: json });
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