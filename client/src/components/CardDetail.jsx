import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPokemonDetail } from "../actions";

export default function CardDetail(props) {
  const dispatch = useDispatch();
  let pokemon = useSelector((state) => state.pokemon);
  const home = useHistory();
  let aux = 0;

  useEffect(() => {
    dispatch(getPokemonDetail(props.match.params.id));
  }, []);

  const handleHome = () => {
    home.push("/home");
  };
  /* if (Array.isArray(pokemon)) {
    console.log("ES ARRAY:", Array.isArray(pokemon[0].types));
    console.log(pokemon[0].types);
    if (pokemon[0].createdInDb) {
      pokemon[0].types = pokemon[0].types.map((t) => t.name);
    }
  } */

  return (
    <div>
      {Array.isArray(pokemon) && (
        <div>
          <h2>{pokemon[0].name}</h2>
          <ul>
            {pokemon[0].createdInDb
              ? pokemon[0].types.map((t) => {
                  return <li key={aux++}>{t.name}</li>;
                })
              : pokemon[0].types.map((t) => {
                  return <li key={aux++}>{t}</li>;
                })}
          </ul>
          <fieldset>
            <legend>Stats</legend>
            <ul>
              <li>Hp: {pokemon[0].hp}</li>
              <li>Attack: {pokemon[0].attack}</li>
              <li>Defense: {pokemon[0].defense}</li>
              <li>Speed: {pokemon[0].speed}</li>
              <li>Height: {pokemon[0].height}</li>
              <li>Weight: {pokemon[0].weight}</li>
            </ul>
          </fieldset>
          <div>
            <img src={pokemon[0].image} alt={pokemon[0].name} width="300" />
          </div>
        </div>
      )}
      <button onClick={() => handleHome()}>Return To Home</button>
    </div>
  );
}

/* [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
[ ] Número de Pokemon (id)
[ ] Estadísticas (vida, ataque, defensa, velocidad)
[ ] Altura y peso
Ruta de creación: deb */
