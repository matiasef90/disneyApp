const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Character = sequelize.define('Character', {
  // Model attributes are defined here
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.TEXT('tiny'),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  historia: {
    type: DataTypes.STRING,
    allowNull: true,
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

module.exports = {
    Character
}