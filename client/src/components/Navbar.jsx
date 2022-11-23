import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";
import {
  getPokemons,
  getTypes,
  filterPokemons,
  existingPokemons,
  createdPokemons,
} from "../actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    dispatch(filterPokemons(e.target.id, e.target.value));
  };

  const handleOrigin = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "existing") dispatch(existingPokemons());
    else if (e.target.value === "created") dispatch(createdPokemons());
    else dispatch(getPokemons());
  };

  return (
    <header>
      <select id="filter" onChange={(e) => handleFilter(e)}>
        <option value="">-- Order --</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select onChange={(e) => handleOrigin(e)}>
        <option value="all">-- All Origins --</option>
        <option value="created">Created</option>
        <option value="existing">Existing</option>
      </select>

      <select id="type" onChange={(e) => handleFilter(e)}>
        <option value="">-- All Types --</option>
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
