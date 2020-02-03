const sequelize = require('./connection');
const Sequelize = require('sequelize');

module.exports = sequelize.define('es_user',
    {
        id:  {
            type: Sequelize.SMALLINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '1'
        },
        create_at: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_login: {
            type: Sequelize.STRING,
            allowNull: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '1'
        },
        telephone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        openid: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        modelName: 'user',
        timestamps: false
    }
);
