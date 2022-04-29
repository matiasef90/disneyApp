const { request, response } = require("express");
const { guardarFile } = require("../helpers");
const { Genero } = require("../models/genero");


const createGenero = async (req = request, res = response) => {
   const data = req.body
   data.nombre = data.nombre.toUpperCase() 
   const existe = await Genero.findOne({
      where: {
         nombre: data.nombre,
         estado: true
      } 
   })
   if (existe) return res.status(400).json({
      msg: `Ya existe una categoría con el nombre ${data.nombre}`
   })
   try {
      const resp = await guardarFile(req.files, 'generos')
      data.imagen = resp.nombre_imagen
      const genero = await Genero.create(data)
      res.json({
         genero
      })
   } catch (error) {
      res.status(400).json({msg: error})      
   }
}
const updateGenero = async (req = request, res = response) => {
   const { id } = req.params
   const data = req.body
   data.nombre = data.nombre.toUpperCase()
   const existe = await Genero.findOne({
      where: {
         id,
         estado: true
      }
   })
   if (!existe) return res.status(400).json({
      msg: `No existe el pelicula con el id ${id}`
   })
   try {
      if (req.files && Object.keys(req.files).length !== 0) {
         Object.keys(req.files).length === 0
         const resp = await guardarFile(req.files, 'generos', undefined, existe.imagen)
         data.imagen = resp.nombre_imagen
      }
      const genero = await Genero.update(data, {
         where: {
            id
         }
      })
      res.json({
         msg: `Genero con id ${id} actualizada`
      })
   } catch (error) {
      res.status(400).json({msg: error})      
   }
}
const deleteGenero = async (req = request, res = response) => {
   const { id } = req.params
   const existe = await Genero.findOne({
      where: {
         id,
         estado: true
      }
   })
   if (!existe) return res.status(400).json({
      msg: `No existe el genero con id ${id}`
   })
   await Genero.update({ estado: false }, {
      where: {
         id
      }
   })
   res.json({
      msg: `Genero con id ${id} eliminado`
   })
}
const listaGenero = async (req = request, res = response) => {
   const generos = await Genero.findAll()
   res.json({
      generos
   })
}


module.exports = {
   createGenero,
   updateGenero,
   deleteGenero,
   listaGenero,
}