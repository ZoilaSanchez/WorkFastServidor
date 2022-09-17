const {Router} = require('express')

const router = Router();

const pruebaHello = require('../controllers/hello')

router.route('/')
.get(pruebaHello.hello)
router.route('/error')
.get(pruebaHello.helloError)

module.exports =router;