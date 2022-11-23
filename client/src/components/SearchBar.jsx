import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, getPokemons, getTypes } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [pokeSearch, setPokeSearch] = useState("");
  const pokemons = useSelector((state) => state.pokemons);
  const handleSearch = (e) => {
    e.preventDefault();
    setPokeSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(getPokemons());

    if (
      pokemons.findIndex(
        (p) => p.name.toLowerCase() === pokeSearch.toLowerCase()
      ) >= 0
    )
      dispatch(getPokemon(pokeSearch));
    else dispatch(getPokemons(pokeSearch));
    setPokeSearch("");
  };
  return (
    <div>
      <input
        value={pokeSearch}
        onChange={(e) => handleSearch(e)}
        placeholder="Search..."
        name="searchbar"
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
