const { Router } = require('express')
const { check } = require('express-validator');
const { updateMovie, createMovie, deleteMovie, getMovie, listaMovie } = require('../controllers/movie');
const { validarCalificacion, validarGenero } = require('../helpers');
const { validarCampos, validarFile, validarJwt, validarFecha, conseguirCharacters } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJwt,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('calificacion', 'La calificacion es obligatorio').not().isEmpty(),
    check('calificacion').custom(validarCalificacion),
    check('fecha_creacion', 'La fecha de creacion es obligatoria').not().isEmpty(),
    check('GeneroId').custom(validarGenero),
    validarFecha,
    validarFile,
    validarCampos,
    conseguirCharacters,
] , createMovie);

router.put('/:id', [
    validarJwt,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('calificacion', 'La calificacion es obligatorio').not().isEmpty(),
    check('calificacion').custom(validarCalificacion),
    check('fecha_creacion', 'La fecha de creacion es obligatoria').not().isEmpty(),
    check('GeneroId').custom(validarGenero),
    validarFecha,
    validarFile,
    validarCampos
] , updateMovie);

router.delete('/:id', [
    validarJwt,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
], deleteMovie)

router.get('/:id', [
    validarJwt,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
], getMovie)

router.get('/', [
    validarJwt,
],listaMovie);

module.exports = router