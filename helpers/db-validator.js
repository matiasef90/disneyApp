const { Genero } = require("../models/genero");
const { User } = require("../models/user");

const existeEmail = async ( email = '' ) => {
    const existeEmail = await User.findOne({ where: { email, estado: true } })
    if(existeEmail) {
        throw new Error(`El email ${email} ya esta registrado`)
    }
};

const validarCalificacion = async ( calificacion = 0 ) => {
    const puntajes = [ 1, 2, 3, 4, 5 ]
    if(!puntajes.includes(Number(calificacion))) {
        throw new Error(`La calificacion ${calificacion}  no es valida - ${puntajes}`)
    }
};

const validarGenero = async ( GeneroId ) => {
    const existe = await Genero.findByPk(GeneroId)
    if(!existe) {
        throw new Error(`El genero con id ${GeneroId}  no es valido`)
    }
};

module.exports = {
    existeEmail,
    validarCalificacion,
    validarGenero,
}
