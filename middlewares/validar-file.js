const validarFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        // throw new Error('No hay imagenes subidas.')
        return res.status(400).json({ msg: 'No hay imagenes subidas.' })
    }
    next()
}

module.exports = {
    validarFile,
}