import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { getPokemons } from "../actions";
import Card from "./Card";
import Navbar from "./Navbar";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
let aux = 0;
export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  //const pokemon = useSelector((state) => state.pokemon);

  const [page, setPage] = useState(1);
  const [pokemonsPage, setPokemonsPage] = useState(12);
  const lastOne = page * pokemonsPage; // 12 / 24
  const fistOne = lastOne - pokemonsPage; // 12 - 12 = 0 / 24 - 12 = 12

  const showPokemons = pokemons.slice(fistOne, lastOne); // 0, 12 - 12, 24
  console.log(showPokemons)

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  const paginated = (page) => {
    setPage(page);
  };

  return (
    <div className={styles.main}>
      <header>
        <SearchBar />
        <Navbar />
      </header>
      <Paginated
        pokemons={pokemons.length}
        pokemonsPage={pokemonsPage}
        paginated={paginated}
      />
      {/* <h2>Pokemons</h2> */}
      <ul className={styles.container}>
        {showPokemons &&
          showPokemons.map((p) => {
            return (
              <li key={p.id}>
                <Card image={p.image} name={p.name} types={p.types} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
