const validarCampo = require('./validar-campos');
const validarFile = require('./validar-file');

module.exports = {
    ...validarCampo,
    ...validarFile
}