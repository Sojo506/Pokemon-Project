import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, createPokemon } from "../actions";

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

    if (Object.keys(errors).length > 0)
      return alert("One or more paremeters are missing");
    if (!checkboxes.length) return alert("At least select one type");
    if (checkboxes.length > 2) return alert("Please select less than 3 types");

    dispatch(createPokemon({ ...input, types: checkboxes }));
    alert("Pokemon created!");
    /* setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    }); */
    home.push("/home");
  };
  
  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            value={input.name}
            id="name"
            name="name"
            type="text"
            maxLength="10"
            placeholder="Name your pokemon..."
            onChange={(e) => handleStats(e)}
          />
          {errors.name && <p className="danger">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="hp">Health:</label>
          <input
            value={input.hp}
            id="hp"
            name="hp"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.hp && <p className="danger">{errors.hp}</p>}
        </div>
        <div>
          <label htmlFor="attack">Attack:</label>
          <input
            value={input.attack}
            id="attack"
            name="attack"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.attack && <p className="danger">{errors.attack}</p>}
        </div>
        <div>
          <label htmlFor="defense">Defense:</label>
          <input
            value={input.defense}
            id="defense"
            name="defense"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.defense && <p className="danger">{errors.defense}</p>}
        </div>
        <div>
          <label htmlFor="speed">Speed:</label>
          <input
            value={input.speed}
            id="speed"
            name="speed"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.spped && <p className="danger">{errors.spped}</p>}
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            value={input.height}
            id="height"
            name="height"
            type="number"
            min="0"
            max="100"
            onChange={(e) => handleStats(e)}
          />
          {errors.height && <p className="danger">{errors.height}</p>}
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            value={input.weight}
            id="weight"
            name="weight"
            type="number"
            min="0"
            max="1000"
            onChange={(e) => handleStats(e)}
          />
          {errors.weight && <p className="danger">{errors.weight}</p>}
        </div>
        <fieldset>
          <legend>Choose your pokemon's types:</legend>
          {types &&
            types.map((t) => {
              return (
                <div key={t.id}>
                  <input
                    type="checkbox"
                    id={t.name}
                    name={t.name}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  <label htmlFor={t.name}>{t.name}</label>
                </div>
              );
            })}
        </fieldset>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Create Pokemon
        </button>
      </form>
      <button onClick={() => home.push("/home")}>Return To Home</button>
    </div>
  );
}
