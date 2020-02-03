const jwt = require('jsonwebtoken');
const { APP_ID } = require('../config');

module.exports = {
    createJWT(id, openid) {
        return jwt.sign({
            id,
            openid
        }, APP_ID, {
            expiresIn: 60 * 60 * 24
        });
    }
};
