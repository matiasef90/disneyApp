const { Router } = require('express')
const { check } = require('express-validator');
const { createCharacter, listaCharacter } = require('../controllers');
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

router.get('/', listaCharacter);

module.exports = router