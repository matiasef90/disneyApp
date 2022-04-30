const validarCampo = require('./validar-campos');
const validarFile = require('./validar-file');
const validarJwt = require('./validar-jwt');
const validarFecha = require('./validar-fecha')
const conseguirCharacters = require('./conseguir-characters')

module.exports = {
    ...validarCampo,
    ...validarFile,
    ...validarJwt,
    ...validarFecha,
    ...conseguirCharacters,
}