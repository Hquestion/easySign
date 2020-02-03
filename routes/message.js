var express = require('express');
var router = express.Router();

const MessageDao = require('../dao/MessageDao');

router.post('/create', async (req, res, next) => {
    const { title, content } = req.body;
    const user = req.user;
    const message = await MessageDao.createMessage({
        title,
        content
    }, user.id);
    res.send(JSON.stringify(message));
});

router.get('/detail', async (req, res, next) => {
    console.log(req.query);
    const msg = await MessageDao.findById(req.query.id);
    res.send(JSON.stringify(msg));
});

router.get('/list', async (req, res, next) => {
    const list = await MessageDao.list();
    res.send(JSON.stringify(list));
});

module.exports = router;
