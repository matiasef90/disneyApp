const moment = require("moment")

const validarFecha = (req, res, next) => {
    moment().locale('es')
    try {
        req.fecha_creacion = moment(req.fecha_creacion).unix()
    } catch (error) {
        return res.status(400).json({ msg: error, formato: 'DD/MM/YY' })    
    }
    next()
}

module.exports = {
    validarFecha,
}