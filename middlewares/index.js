const validarCampo = require('./validar-campos');
const validarFile = require('./validar-file');
const validarJwt = require('./validar-jwt');

module.exports = {
    ...validarCampo,
    ...validarFile,
    ...validarJwt,
}