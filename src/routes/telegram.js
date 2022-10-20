const {Router} = require('express')

const router = Router();

const telegram = require('../controllers/telegram')

router.route('/')
.post(telegram.insertarID)

module.exports =router;