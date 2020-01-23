var express = require('express');
var router = express.Router();
const axios = require('axios');
const { APP_SECRET, APP_ID } = require('../config');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    const code = req.body.code;
    axios.get("https://api.weixin.qq.com/sns/jscode2session", {
        params: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: code,
            grant_type: "authorization_code"
        }
    }).then((result) => {
        console.log(result.data);
        res.send('error');
    }, err => {
        console.error(11, err);
    });
});

module.exports = router;
