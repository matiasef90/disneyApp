const { Router } = require('express')
const { check } = require('express-validator');
const { createGenero, updateGenero, deleteGenero, listaGenero } = require('../controllers/genero');
const { validarCampos, validarFile, validarJwt } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarFile,
    validarCampos
], createGenero);

router.put('/:id', [
    validarJwt,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarFile,
    validarCampos
], updateGenero);

router.delete('/:id', [
    validarJwt,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
], deleteGenero)

router.get('/', [
    validarJwt,
], listaGenero);

module.exports = router