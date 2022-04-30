const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
const port = process.env.PORT

const middleware = () => {
    app.use(cors())
    app.use(express.json())
    app.use(fileUpload())
}

const routes = () => {
    app.use('/api/auth', require('../routes/auth'));
    app.use('/api/character', require('../routes/character'));
    app.use('/api/genero', require('../routes/genero'));
    app.use('/api/movie', require('../routes/movie'));
}

const listen = (db) => {
    app.listen(port, async () => {
        console.log(`Corriendo en el puerto ${port}`)
        try {
            await db.authenticate()
            console.log('Coneccion db exitosa')
            await db.sync({ alter: true })
            console.log('Modelos sincronizados')
        } catch (error) {
            console.log(error)
            console.log('No se pudo conectar a db')
            
        }
    });
}

module.exports = {
    routes,
    listen,
    middleware
} 