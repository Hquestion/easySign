var express = require('express');
var router = express.Router();

const UserDao = require('../dao/UserDao');
const { createJWT } = require('../utils/jwt');

const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', async function (req, res, next) {
    const {code, nickName, avatarUrl, gender} = req.body;
    const user = await UserDao.wxLogin({
        code,
        nickName,
        avatarUrl,
        gender
    });
    const token = createJWT(user.id, user.openid);
    res.send(JSON.stringify({
        userInfo: user,
        token
    }));
});

router.post('/createJWTToken', async function(req, res, next) {
    const { id, openid } = req.body;
    const token = createJWT(id, openid);
    res.send(JSON.stringify({
        token
    }));
});

router.get('/test', async function(req, res, next) {
    if (req.query.token) {
        res.send('success');
    }
    res.status('401');
    res.send('error');
});

module.exports = router;
