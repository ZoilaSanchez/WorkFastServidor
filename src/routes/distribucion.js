const {Router} = require('express')

const router = Router();

const distribucionFuncionPF = require('../controllers/distribucion')

router.route('/')
.post(distribucionFuncionPF.generarOrdenPF)
.put(distribucionFuncionPF.aprobacionOrden)

router.route('/entrega')
.post(distribucionFuncionPF.entregas)

router.route('/solicitar')
.post(distribucionFuncionPF.solicitud)

router.route('/historial')
.post(distribucionFuncionPF.historial)

module.exports = router;