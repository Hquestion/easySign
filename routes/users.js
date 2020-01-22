var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const { APP_SECRET, APP_ID } = require('../config');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    const code = req.code;
    fetch("https://api.weixin.qq.com/sns/jscode2session", {
        appid: APP_ID,
        secret: APP_SECRET,
        js_code: code,
        grant_type: "authorization_code"
    }).then((result) => {
        console.log(result);
    });
});

module.exports = router;
