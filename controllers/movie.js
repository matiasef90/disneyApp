const { request, response } = require("express");
const { guardarFile } = require("../helpers");
const { Character } = require("../models/character");
const { Genero } = require("../models/genero");
const { Movie } = require("../models/movie");

const createMovie = async (req = request, res = response) => {
   const data = req.body
   data.titulo = data.titulo.toUpperCase()
   const existe = await Movie.findOne({
      where: {
         titulo: data.titulo,
         estado: true
      } 
   })
   if (existe) return res.status(400).json({
      msg: `Ya existe una pelicula con el titulo ${data.titulo}`
   })
   try {
      const resp = await guardarFile(req.files, 'movies')
      data.imagen = resp.nombre_imagen
      const movie = await Movie.create(data)
      movie.addCharacters(req.characters)
      res.json({
         movie
      })
   } catch (error) {
      res.status(400).json({msg: error})      
   }
}
const updateMovie = async (req = request, res = response) => {
   const { id } = req.params
   const data = req.body
   const existe = await Movie.findOne({
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
         const resp = await guardarFile(req.files, 'movies', undefined, existe.imagen)
         data.imagen = resp.nombre_imagen
      }
      await Movie.update(data, {
         where: {
            id
         }
      })
      res.json({
         msg: `Pelicula con id ${id} actualizada`
      })
   } catch (error) {
      res.status(400).json({msg: error})      
   }
}
const deleteMovie = async (req = request, res = response) => {
   const { id } = req.params
   const existe = await Movie.findOne({
      where: {
         id,
         estado: true
      }
   })
   if (!existe) return res.status(400).json({
      msg: `No existe la pelicula con id ${id}`
   })
   await Movie.update({ estado: false }, {
      where: {
         id
      }
   })
   res.json({
      msg: `Pelicula con id ${id} eliminado`
   })
}
const getMovie = async (req = request, res = response) => {
   const { id } = req.params
   const existe = await Movie.findOne({
      where: {
         id,
         estado: true
      },
      include: [ Genero, Character ],
   })
   if (!existe) return res.status(400).json({
      msg: `No existe la pelicula con id ${id}`
   })
   res.json({
      movie: existe
   })
}
const listaMovie = async (req = request, res = response) => {
   let { name, genre, order = 'DESC' } = req.query
   const filter = { estado: true }
   if (genre) filter.GeneroId = Number(genre)
   if (order !== 'ASC' || order !== 'DESC') order = 'DESC'
   if (name) filter.titulo = name
   const movies = await Movie.findAll({
      where: filter,
      order: [
         ['fecha_creacion', order],
      ],
      attributes: ['imagen', 'titulo', 'fecha_creacion'],
   })
   res.json({
      movies
   })
}

module.exports = {
   createMovie,
   listaMovie,
   updateMovie,
   deleteMovie,
   getMovie,
}