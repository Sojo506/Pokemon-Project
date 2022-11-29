import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPokemonDetail } from "../actions";
import styles from "../styles/CardDetail.module.css";
import Loading from "./Loading";

export default function CardDetail(props) {
  const dispatch = useDispatch();
  let pokemon = useSelector((state) => state.pokemon);
  const home = useHistory();
  let aux = 0; // TO AVOID REPEATED KEYS

  useEffect(() => {
    dispatch(getPokemonDetail(props.match.params.id));
  }, []);

  return (
    <div className={styles.container}>
      {pokemon.length ? (
        <div className={styles.pokeContainer}>
          <div className={styles.info}>
            <div>
              <h1>
                #
                {pokemon[0].id.length === 36
                  ? pokemon[0].id.slice(0, 5)
                  : pokemon[0].id}
              </h1>
              <h2>{pokemon[0].name}</h2>
              <ul className={styles.types}>
                {pokemon[0].createdInDb
                  ? pokemon[0].types.map((t) => {
                      return <li key={aux++}>{t.name}</li>;
                    })
                  : pokemon[0].types.map((t) => {
                      return <li key={aux++}>{t}</li>;
                    })}
              </ul>
            </div>

            <div className={styles.image}>
              <img src={pokemon[0].image} alt={pokemon[0].name} width="300" />
            </div>
          </div>
          {/* STATS */}
          <fieldset className={styles.stats}>
            <legend>Stats</legend>

            <div>
              <div className={styles.progressContainer}>
                <h3>Hp:</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${pokemon[0].hp > 100 ? 100 : pokemon[0].hp}%`,
                    }}
                  >
                    <div className={styles.progressValue}>{pokemon[0].hp}%</div>
                  </div>
                </div>
              </div>

              <div className={styles.progressContainer}>
                <h3>Attack:</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${
                        pokemon[0].attack > 100 ? 100 : pokemon[0].attack
                      }%`,
                    }}
                  >
                    <div className={styles.progressValue}>
                      {pokemon[0].attack}%
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.progressContainer}>
                <h3>Defense:</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${
                        pokemon[0].defense > 100 ? 100 : pokemon[0].defense
                      }%`,
                    }}
                  >
                    <div className={styles.progressValue}>
                      {pokemon[0].defense}%
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.progressContainer}>
                <h3>Speed:</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${
                        pokemon[0].speed > 100 ? 100 : pokemon[0].speed
                      }%`,
                    }}
                  >
                    <div className={styles.progressValue}>
                      {pokemon[0].speed}%
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.progressContainer}>
                <h3>Height:</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${pokemon[0].height}%`,
                    }}
                  >
                    <div className={styles.progressValue}>
                      {pokemon[0].height}%
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.progressContainer}>
                <h3>Weight:</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${
                        pokemon[0].weight > 100 ? 100 : pokemon[0].weight
                      }%`,
                    }}
                  >
                    <div className={styles.progressValue}>
                      {pokemon[0].weight}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          {/* END OF STATS */}

          <button className={styles.btn} onClick={() => home.push(`/home`)}>
            Return
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
