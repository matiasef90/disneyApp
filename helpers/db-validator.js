const { User } = require("../models/user");

const existeEmail = async ( email = '' ) => {
    const existeEmail = await User.findOne({ where: { email, estado: true } })
    if(existeEmail) {
        throw new Error(`El email ${email} ya esta registrado`)
    }
};

module.exports = {
    existeEmail,
}
