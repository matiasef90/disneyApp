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
   if (existe) return res.status(400).json({
      msg: `Ya existe el personaje con el nombre ${data.nombre}`
   })
   try {
      const resp = await guardarFile(req.files, 'characters')
      data.imagen = resp.nombre_imagen
      const character = await Character.create(data)
      res.json({
         character
      })
   } catch (error) {
      res.status(400).json({msg: error})      
   }
}
const updateCharacter = async (req = request, res = response) => {
   const { id } = req.params
   const data = req.body
   const existe = await Character.findOne({
      where: {
         id,
         estado: true
      }
   })
   if (!existe) return res.status(400).json({
      msg: `No existe el personaje con el nombre ${data.nombre}`
   })
   try {
      if (req.files && Object.keys(req.files).length !== 0) {
         Object.keys(req.files).length === 0
         const resp = await guardarFile(req.files, 'characters', undefined, existe.imagen)
         data.imagen = resp.nombre_imagen
      }
      const character = await Character.update(data, {
         where: {
            id
         }
      })
      res.json({
         msg: `Character con id ${id} actualizado`
      })
   } catch (error) {
      res.status(400).json({msg: error})      
   }
}
const deleteCharacter = async (req = request, res = response) => {
   const { id } = req.params
   const existe = await Character.findOne({
      where: {
         id,
         estado: true
      }
   })
   if (!existe) return res.status(400).json({
      msg: `No existe el personaje con id ${id}`
   })
   await Character.update({ estado: false }, {
      where: {
         id
      }
   })
   res.json({
      msg: `Character con id ${id} eliminado`
   })
}
const getCharacter = async (req = request, res = response) => {
   const { id } = req.params
   const existe = await Character.findOne({
      where: {
         id,
         estado: true
      }
   })
   if (!existe) return res.status(400).json({
      msg: `No existe el personaje con id ${id}`
   })
   res.json({
      character: existe
   })
}
const listaCharacter = async (req = request, res = response) => {
   const { nombre, edad, peso } = req.query
   const filter = { estado: true }
   if (nombre) filter.nombre = nombre
   if (edad) filter.edad = edad
   if (peso) filter.peso = peso
   const characters = await Character.findAll({
      where: filter,
      attributes: ['imagen', 'nombre']
   })
   res.json({
      characters
   })
}


module.exports = {
   createCharacter,
   listaCharacter,
   updateCharacter,
   deleteCharacter,
   getCharacter
}