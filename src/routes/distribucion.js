const {Router} = require('express')

const router = Router();

const distribucionFuncionPF = require('../controllers/distribucion')

router.route('/')
.post(distribucionFuncionPF.generarOrdenPF)
.put(distribucionFuncionPF.aprobacionOrden)

router.route('/entrega')
.get(distribucionFuncionPF.entregas)

router.route('/solicitud')
.get(distribucionFuncionPF.entregas)

router.route('/historial')
.get(distribucionFuncionPF.historial)

module.exports = router;