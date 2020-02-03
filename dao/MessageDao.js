const dayjs = require('dayjs');

const Message = require('../models/Message');
const User = require('../models/User');

module.exports = {
    async createMessage(message, id) {
        let msg;
        try {
            msg = await Message.create({
                title: message.title,
                content: message.content,
                creator: id,
                create_at: dayjs().toISOString()
            });
        }catch (e) {
            msg = null;
        }
        return msg;
    },
    async findById(id) {
        const data = await Message.findOne({
            where: {
                id
            },
            include: [{
                model: User,
                as: 'user'
            }],
            raw: false
        });
        return data;
    },
    async list() {
        const data = await Message.findAll({
            include: [{
                model: User,
                as: 'user'
            }],
            limit: 50,
            order: [
                ['create_at', 'DESC']
            ],
            raw: false
        });
        return data;
    }
};
