const { Type } = require("../db");
const axios = require("axios");

const getTypes = async (req, res) => {
  const data = await axios({
    method: "get",
    url: "https://pokeapi.co/api/v2/type",
    headers: { "Accept-Encoding": "null" },
  }).then((response) => response.data.results); // GET INTO RESULT ARRAY TO GET THE TYPES

  const types = data.forEach(async (t) => {
    console.log;
    await Type.findOrCreate({
      where: {
        name: t.name,
      },
    });
  });

  res.json(await Type.findAll());
};

module.exports = {
  getTypes,
};
