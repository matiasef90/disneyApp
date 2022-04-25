const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mundo_disney',
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
    );

module.exports = {
    sequelize,
}