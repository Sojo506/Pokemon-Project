import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { getPokemons } from "../actions";
import Card from "./Card";
import Navbar from "./Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div className={styles.main}>
      <Navbar/>
      {/* <h2>Pokemons</h2> */}
      <ul className={styles.container}>
        {pokemons &&
          pokemons.map((p) => {
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