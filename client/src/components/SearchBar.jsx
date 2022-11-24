import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon, getPokemons } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [pokeSearch, setPokeSearch] = useState("");
  const regex = /^[a-zA-Z]*$/;
  const handleSearch = (e) => {
    e.preventDefault();
    setPokeSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (regex.test(pokeSearch)) {
      dispatch(getPokemon(pokeSearch));
    } else {
      dispatch(getPokemons());
      setPokeSearch("");
    }

    setTimeout(() => {
      setPokeSearch("");
    }, 3000);
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
