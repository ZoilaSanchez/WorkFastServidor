const {Router} = require('express')

const router = Router();

const aprobacionMPFunc = require('../controllers/aprobacionMP')

router.route('/')
.post(aprobacionMPFunc.registrarAprobacionMP)
.put(aprobacionMPFunc.observacionAprobacionMP)



module.exports = router;