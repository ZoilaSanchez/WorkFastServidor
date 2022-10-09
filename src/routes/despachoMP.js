const {Router} = require('express')

const router = Router();

const despachoMPFunc = require('../controllers/despachoMP')

router.route('/')
.post(despachoMPFunc.registrarDespachoMP)
.put(despachoMPFunc.aprobarDespachoMP)
.get(despachoMPFunc.obtenerOrdenLista)

router.route('/individual')
.get(despachoMPFunc.obtenerOrdenFinal)



module.exports = router;