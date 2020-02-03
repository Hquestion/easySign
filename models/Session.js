const sequelize = require('./connection');
const Sequelize = require('sequelize');

module.exports = sequelize.define('es_session',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.SMALLINT,
            allowNull: false,
            primaryKey: true
        },
        user_id: Sequelize.SMALLINT,
        session_key: Sequelize.STRING,
        token: Sequelize.STRING,
        expire_at: Sequelize.STRING,
        create_at: Sequelize.STRING
    },{
        freezeTableName: true,
        modelName: 'session',
        timestamps: false
    }
);
