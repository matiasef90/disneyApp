const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const { Character } = require('./character');

const Movie = sequelize.define('Movie', {
  // Model attributes are defined here
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  titulo: {
    type: DataTypes.TEXT('tiny'),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.INTEGER,
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

Movie.belongsToMany(Character, { through: 'CharacterMovie' })
Character.belongsToMany(Movie, { through: 'CharacterMovie' })

module.exports = {
  Movie
}