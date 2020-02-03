const sequelize = require('./connection');
const Sequelize = require('sequelize');
const User = require('./User');

const Message = sequelize.define('es_message',
    {
        id: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        content: {
            type: Sequelize.STRING,
            allowNull: true
        },
        creator: {
            type: Sequelize.SMALLINT,
            field: 'creator',
            references: {
                // 这是引用另一个模型
                model: User,

                // 这是引用模型的列名称
                key: 'id',
            }
        },
        create_at: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        modelName: 'message',
        timestamps: false
    }
);

Message.belongsTo(User, { foreignKey: 'creator', targetKey: 'id', as: 'user' });


module.exports = Message;
