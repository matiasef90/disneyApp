const { request } = require("express");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const validarJwt = async (req = request, res = response, next) => {
    const token = req.header('token')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token el la peticion'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await User.findByPk(uid)
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario estado false'
            })
        }
        req.usuario = usuario
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Acceso no autorizado'
        })
    }
}

module.exports = {
    validarJwt,
}