import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon, getPokemons } from "../actions";
import styles from '../styles/SearchBar.module.css';

export default function SearchBar(props) {
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
      dispatch(getPokemon(pokeSearch.toLowerCase()));
    } else {
      dispatch(getPokemons());
      setPokeSearch("");
    }

    setTimeout(() => {
      setPokeSearch(""); // SET THE INPUT SEARCH TO EMPTY
    }, 2000);
    props.setPage(1) // SET THE PAGINATED TO 1
  };
  return (
    <div className={styles.container}>
      <input
        value={pokeSearch}
        onChange={(e) => handleSearch(e)}
        placeholder="Search..."
        name="searchbar"
      />
      <button className={styles.btn} type="submit" onClick={(e) => handleSubmit(e)}>
        Catch Them!
      </button>
    </div>
  );
}
