const { request, response } = require("express");
const { User } = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const register = async (req = request, res = response) => {
    const data = req.body
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(data.password, salt);
    const user = await User.create(data)
    res.json({
        user
    })
}

const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await User.findOne({ where: { email, estado: true } });
        if(!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe!!',
            });
        }
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario fue dado de baja!!',
            });
        }
        const validarPass = bcryptjs.compareSync(password, usuario.password);
        if(!validarPass) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta!!',
            });
        }
        const token = await generarJWT(usuario.id);
        res.json({
            msg: 'Login ok',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error cominiquese con el Admin',
        })
    }
}

module.exports = {
   register,
   login,

}