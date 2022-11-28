import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, createPokemon } from "../actions";
import styles from "../styles/CardCreate.module.css";
import Loading from "./Loading";

export default function CardCreate() {
  const dispatch = useDispatch();
  const home = useHistory();
  const types = useSelector((state) => state.types);
  const [checkboxes, setCheckoxes] = useState([]);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });
  const form = document.querySelector(".form");
  console.log(form);

  // FORM VALIDATE
  function validate(input) {
    const errors = {};

    if (!input.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z]*$/.test(input.name)) {
      errors.name = "Name is invalid";
    }

    if (!input.hp) {
      errors.hp = "Hp is required";
    } else if (input.hp <= 0 || input.hp > 100) {
      errors.hp = "Hp is invalid";
    }

    if (!input.attack) {
      errors.attack = "Attack is required";
    } else if (input.attack <= 0 || input.attack > 100) {
      errors.attack = "Attack is invalid";
    }

    if (!input.defense) {
      errors.defense = "Defense is required";
    } else if (input.defense <= 0 || input.defense > 100) {
      errors.defense = "Defense is invalid";
    }

    if (!input.speed) {
      errors.speed = "Speed is required";
    } else if (input.speed <= 0 || input.speed > 100) {
      errors.speed = "Speed is invalid";
    }

    if (!input.height) {
      errors.height = "Height is required";
    } else if (input.height <= 0 || input.height > 100) {
      errors.height = "Height is invalid";
    }

    if (!input.weight) {
      errors.weight = "Weight is required";
    } else if (input.weight <= 0 || input.weight > 1000) {
      errors.weight = "Weight is invalid";
    }

    return errors;
  }

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const handleStats = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheckBox = (e) => {
    if (e.target.checked)
      return setCheckoxes((result) => [...result, e.target.name]);
    setCheckoxes((result) => result.filter((r) => r !== e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let aux = 0
    for(let i in input) {
      if(!input[i]) aux++
    }

    console.log(aux)

    if (Object.keys(errors).length > 0 || aux > 0)
      return alert("One or more paremeters are missing");
    if (!checkboxes.length) return alert("At least select one type");
    if (checkboxes.length > 2) return alert("Please select less than 3 types");

    dispatch(createPokemon({ ...input, types: checkboxes }));
    alert("Pokemon created!");
    home.push("/home");
  };

  const handleReset = () => {
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    });
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div id={styles.firstOne} className={styles.formItems}>
          <label htmlFor="name">Name:</label>
          <input
            value={input.name}
            id="name"
            name="name"
            type="text"
            maxLength="10"
            placeholder="Name it!"
            onChange={(e) => handleStats(e)}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.formItems}>
          <label htmlFor="hp">Health:</label>
          <input
            value={input.hp}
            placeholder={Math.floor(Math.random() * 100)}
            id="hp"
            name="hp"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.hp && <p className={styles.error}>{errors.hp}</p>}
        </div>

        <div className={styles.formItems}>
          <label htmlFor="attack">Attack:</label>
          <input
            value={input.attack}
            placeholder={Math.floor(Math.random() * 100)}
            id="attack"
            name="attack"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.attack && <p className={styles.error}>{errors.attack}</p>}
        </div>

        <div className={styles.formItems}>
          <label htmlFor="defense">Defense:</label>
          <input
            value={input.defense}
            placeholder={Math.floor(Math.random() * 100)}
            id="defense"
            name="defense"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.defense && <p className={styles.error}>{errors.defense}</p>}
        </div>

        <div className={styles.formItems}>
          <label htmlFor="speed">Speed:</label>
          <input
            value={input.speed}
            placeholder={Math.floor(Math.random() * 100)}
            id="speed"
            name="speed"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.spped && <p className={styles.error}>{errors.spped}</p>}
        </div>

        <div className={styles.formItems}>
          <label htmlFor="height">Height:</label>
          <input
            value={input.height}
            placeholder={Math.floor(Math.random() * 100)}
            id="height"
            name="height"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.height && <p className={styles.error}>{errors.height}</p>}
        </div>

        <div className={styles.formItems}>
          <label htmlFor="weight">Weight:</label>
          <input
            value={input.weight}
            placeholder={Math.floor(Math.random() * 1000)}
            id="weight"
            name="weight"
            type="number"
            min="0"
            max="1000"
            onChange={(e) => handleStats(e)}
          />
          {errors.weight && <p className={styles.error}>{errors.weight}</p>}
        </div>
      </form>

      <fieldset className={styles.types}>
        <legend>Choose your pokemon's types</legend>
        {types.length &&
          types.map((t) => {
            return (
              <div key={t.id} className={styles.typeItems}>
                <input
                  type="checkbox"
                  id={t.name}
                  name={t.name}
                  onChange={(e) => handleCheckBox(e)}
                />
                <label className={styles.typeLabel} htmlFor={t.name}>
                  {t.name}
                </label>
              </div>
            );
          })}
      </fieldset>

      <div className={styles.btns}>
        <button
          className={styles.btn}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Catch It!
        </button>
        <button className={styles.btn} onClick={() => home.push("/home")}>
          Return To Home
        </button>
        <button className={styles.btn} onClick={() => handleReset()}>
          Reset
        </button>
      </div>
      <div className={styles.image}>
        <img
          src="https://www.pinclipart.com/picdir/big/300-3009374_pokemon-go-clipart-pokeball-png-download.png"
          alt="pokeball"
        />
      </div>
    </div>
  );
}
