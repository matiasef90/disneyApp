const { Router } = require('express')
const { check } = require('express-validator');
const { register } = require('../controllers/user');
const { existeEmail } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/register', [
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(existeEmail),
    check('password', 'La password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
] , register);

module.exports = router