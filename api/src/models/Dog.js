const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    ID: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/foto-gratis/hermoso-retrato-mascota-perro_23-2149218452.jpg?w=2000'
    },
    db:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    },
    origin:{
      type: DataTypes.STRING,
      allowNull:false,
    }
    },
    {
      timestamps: false
    },
  );
};
