const { request, response } = require("express");
const { guardarFile } = require("../helpers");
const { Character } = require("../models/character");


const createCharacter = async (req = request, res = response) => {
   const data = req.body
   data.nombre = data.nombre.toUpperCase() 
   const existe = await Character.findOne({
      where: {
         nombre: data.nombre,
         estado: true
      } 
   })
   console.log(existe)
   if (existe) return res.status(400).json({
      msg: `Ya existe el personaje con el nombre ${data.nombre}`
   })
   data.nombre = data.nombre.toUpperCase()
   const character = await Character.create(data)
   const file = req.files.imagen
   guardarFile()
   res.json({
      character,
      file
   })
}
const listaCharacter = async (req = request, res = response) => {
   const characters = await Character.findAll({
      where: {
         estado: true,
      },
      attributes: ['imagen', 'nombre']
   })
   res.json({
      characters
   })
}


module.exports = {
   createCharacter,
   listaCharacter
}