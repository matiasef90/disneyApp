const uploadFile = require('./uploadFile')
const dbValidator = require('./db-validator')

module.exports = {
    ...uploadFile,
    ...dbValidator,
}