import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";
import {
  getPokemons,
  getTypes,
  filterPokemons,
  existingPokemons,
  createdPokemons,
} from "../actions";

export default function Navbar({ setPage }) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes()); // GET THE TYPES
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterPokemons(e.target.id, e.target.value));
    setPage(1); // SET THE PAGE TO DEFAULT
  };

  const handleOrigin = async(e) => {
    e.preventDefault();
    if (e.target.value === "all") {
      dispatch(getPokemons());
    }
    if (e.target.value === "existing") dispatch(existingPokemons());
    if (e.target.value === "created") dispatch(createdPokemons());
    setPage(1); // SET THE PAGE TO DEFAULT
  };

  return (
    <header className={styles.container}>
      <select
        className={styles.items}
        id="filter"
        onChange={(e) => handleFilter(e)}
      >
        <option value="all">-- Order By Name --</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <select className={styles.items} onChange={(e) => handleOrigin(e)}>
        <option value="all">-- All Origins --</option>
        <option value="created">Created</option>
        <option value="existing">Existing</option>
      </select>

      <select
        className={styles.items}
        id="attack"
        onChange={(e) => handleFilter(e)}
      >
        <option value="all">-- Order By Attack --</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <select
        className={styles.items}
        id="type"
        onChange={(e) => handleFilter(e)}
      >
        <option value="all">-- All Types --</option>
        {types &&
          types.map((t) => {
            return (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            );
          })}
      </select>
    </header>
  );
}
