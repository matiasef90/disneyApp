const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/config')

const User = sequelize.define('User', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
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

module.exports = {
  User
}