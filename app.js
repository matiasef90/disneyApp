require('dotenv').config()

const { sequelize } = require('./database/config')
const { middleware, routes, listen } = require('./models/server')

middleware()
routes()
listen(sequelize)

