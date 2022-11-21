const { Type } = require("../db");
const axios = require("axios");

const getTypes = async(req, res) => {
  const data = await axios
  .get("https://pokeapi.co/api/v2/type")
  .then((response) => response.data.results) // GET INTO RESULT ARRAY TO GET THE TYPES
  .then((types) => types);

  const types = data.forEach(async t => {
    console.log
    await Type.findOrCreate({
      where: {
        name: t.name
      }
    })
  })
  
  res.json(await Type.findAll());
}

module.exports = {
  getTypes
}