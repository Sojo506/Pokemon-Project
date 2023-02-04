import React from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../actions";
import styles from "../styles/Paginated.module.css";

export default function Paginated({ pokemons, pokemonsPage }) {
  const pages = [];
  const dispatch = useDispatch();
  
  for (let i = 0; i < Math.ceil(pokemons / pokemonsPage); i++) {
    pages.push(i + 1);
  }

  return (
    <div>
      <ul className={styles.pageContainer}>
        {pages &&
          pages.map((p) => {
            return (
              <li key={p}>
                <button onClick={() => dispatch(setPage(p))}>{p}</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
