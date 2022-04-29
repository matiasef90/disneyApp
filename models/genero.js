const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const { Movie } = require('./movie');

const Genero = sequelize.define('Genero', {
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.TEXT('tiny'),
    allowNull: false,
  },
  estado: { 
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true 
  },
}, {
  // Other model options go here
  timestamps: false,
});
Genero.Movie = Movie.belongsTo(Genero);

module.exports = {
  Genero
}