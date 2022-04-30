const { Character } = require("../models/character")


const conseguirCharacters = async ( req, res, next) => {
    const { id_characters  } = req.body
    try {
        let id_chars 
        if (typeof  id_characters === 'object' ) id_chars = id_characters
        id_chars = JSON.parse(id_characters)
        const characters = []
        if (id_chars.length !== 0) {
            for (const c in id_chars) {
                const existe = await Character.findByPk(id_chars[c])
                if (existe) characters.push(existe)
                }
            req.characters = characters
        }
    } catch (error) {
        res.status(400).json({
            msg: `${error} - Formato Valido: [1, 2, 3, 4, 5]`
        })
    }
    next()
}

module.exports = {
    conseguirCharacters
}


