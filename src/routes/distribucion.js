const {Router} = require('express')

const router = Router();

const distribucionFuncionPF = require('../controllers/distribucion')

router.route('/')
.post(distribucionFuncionPF.generarOrdenPF)
.put(distribucionFuncionPF.aprobacionOrden)



module.exports = router;