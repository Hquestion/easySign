const Sequelize = require('sequelize');
const { DATABASE} = require('../config');

const sequelize = new Sequelize(DATABASE.database, DATABASE.user, DATABASE.password, {
    host: DATABASE.host,
    dialect: 'mysql',
    query: {
        raw: true
    }
});

module.exports = sequelize;
