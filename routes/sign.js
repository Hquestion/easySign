var express = require('express');
var router = express.Router();

const SignDao = require('../dao/SignDao');

router.get('/list', async (req, res, next) => {
    const msgId = req.query.messageId;
    const data = await SignDao.findSignInfoByMessage(msgId);
    res.send(JSON.stringify(data));
});

router.post('/sign', async (req, res, next) => {
    const { messageId } = req.body;
    const data = await SignDao.sign(messageId, req.user.id);
    res.send(JSON.stringify(data));
});

module.exports = router;
