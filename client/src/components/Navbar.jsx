import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <header>
      <input name="searchbar" />
      <select value="order">
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select value="origins">
        <option value="all">All Origins</option>
        <option value="created">Created</option>
        <option value="existing">Existing</option>
      </select>

      <select value="types">
        <option value="all" selected>-- All Types --</option>
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
