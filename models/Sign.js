const sequelize = require('./connection');
const Sequelize = require('sequelize');
const User = require('./User');
const Message = require('./Message');

const Sign = sequelize.define('es_sign',
    {
        id: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        message_id: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'message_id',
            references: {
                // 这是引用另一个模型
                model: Message,

                // 这是引用模型的列名称
                key: 'id',
            }
        },
        sign_user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'sign_user_id',
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
        }
    },
    {
        freezeTableName: true,
        modelName: 'sign',
        timestamps: false
    }
);

Sign.belongsTo(User, { foreignKey: 'sign_user_id', targetKey: 'id', as: 'user' });
Sign.belongsTo(Message, { foreignKey: 'message_id', targetKey: 'id', as: 'message' });


module.exports = Sign;
