import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, createPokemon } from "../actions";

export default function CardCreate() {
  const dispatch = useDispatch();
  const home = useHistory()
  const types = useSelector((state) => state.types);
  const [typesArray, setTypes] = useState([]);
  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const handleStats = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value)
  };

  const handleCheckBox = (e) => {
    if(e.target.checked) setTypes(result => [...result, e.target.name]);
    console.log(typesArray)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.name || !input.hp || !input.attack || !input.defense || !input.speed || !input.height || !input.weight || !types.length) return alert('Some Parameters are missing')
    if((input.hp <=0 || input.hp > 100)  || (input.attack <=0 || input.attack > 100)  || (input.defense <=0 || input.defense > 100)  || (input.speed <=0 || input.speed > 100)  || (input.height <=0 || input.height > 100)  || (input.weight <=0 || input.weight > 1000)) return alert('Some Parameters are out of range')
    dispatch(createPokemon({...input, types: typesArray}))
    alert('Pokemon created!')
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    })

  }
  const handleHome = () => {
    home.push('/home')
    console.log(36)
  }
  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            value={input.name} id="name" name="name" type="text" onChange={(e) => handleStats(e)}/>
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
        </div>
        <fieldset>
          <legend>Choose your pokemon's types:</legend>
          {types &&
            types.map((t) => {
              return (
                <div key={t.id}>
                  <input type="checkbox" id={t.name} name={t.name} onChange={(e) => handleCheckBox(e)} />
                  <label htmlFor={t.name}>{t.name}</label>
                </div>
              );
            })}
        </fieldset>
        <button type="submit" onClick={e => handleSubmit(e)}>Create Pokemon</button>
      </form>
      <button onClick={() => handleHome()}>Return To Home</button>
    </div>
  );
}
