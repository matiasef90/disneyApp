const { Router } = require('express')
const { check } = require('express-validator');
const {
    createCharacter,
    listaCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacter
} = require('../controllers');
const { validarCampos, validarFile } = require('../middlewares');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatorio').not().isEmpty(),
    check('edad', 'La edad debe ser un numero entero').isInt(),
    check('peso', 'El peso es obligatorio').not().isEmpty(),
    check('peso', 'La edad debe ser un numero').isNumeric(),
    check('historia', 'La historia es obligatorio').not().isEmpty(),
    validarFile,
    validarCampos
] , createCharacter);

router.put('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatorio').not().isEmpty(),
    check('edad', 'La edad debe ser un numero entero').isInt(),
    check('peso', 'El peso es obligatorio').not().isEmpty(),
    check('peso', 'La edad debe ser un numero').isNumeric(),
    check('historia', 'La historia es obligatorio').not().isEmpty(),
    validarCampos
] , updateCharacter);

router.delete('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
], deleteCharacter)

router.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'La id debe ser un numero entero').isInt(),
], getCharacter)

router.get('/', listaCharacter);

module.exports = router