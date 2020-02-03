const axios = require('axios');
const dayjs = require('dayjs');

const Sign = require('../models/Sign');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = {
    async findSignInfoByMessage(MsgId) {
        let signList;
        try {
            signList = await Sign.findAll({
                where: {
                    message_id: MsgId
                },
                include: [{
                    model:Message,
                    as: 'message'
                }, {
                    model: User,
                    as: 'user'
                }],
                raw: false
            })
        } catch (e) {
            signList = [];
        }
        return signList;
    },
    async sign(messageId, userId) {
        let info;
        try {
            const signed = await this.findSignInfoByMessage(messageId, userId);
            console.log(signed);
            const isSigned = Array.isArray(signed) ? signed.length > 0 : !!signed;
            if (isSigned) {
                info = signed;
            } else {
                info = await Sign.create({
                    message_id: messageId,
                    sign_user_id: userId,
                    create_at: dayjs().toISOString()
                });
            }
        }catch (e) {
            console.error('-----');
            console.error(e);
            info = null;
        }
        return info;
    },
    async findUserSignInfo(messageId, userId) {
        let info;
        try {
            info = await Sign.findOne({
                where: {
                    message_id: messageId,
                    sign_user_id: userId
                }
            });
        }catch (e) {
            info = null;
        }
        return info;
    }
};
