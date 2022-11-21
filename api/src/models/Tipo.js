const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// let id = 10249
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false
    /* timestamps: false,
    createdAt: false,
    updatedAt: 'actualizado' */
  });
};
