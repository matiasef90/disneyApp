require('dotenv').config()

const { middleware, routes, listen } = require('./models/server')


middleware()
routes()
listen()