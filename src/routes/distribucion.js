const {Router} = require('express')

const router = Router();

const distribucionFuncionPF = require('../controllers/distribucion')

router.route('/')
.post(distribucionFuncionPF.generarOrdenPF)
.put(distribucionFuncionPF.aprobacionOrden)

router.route('/entrega')
.get(distribucionFuncionPF.entregas)

router.route('/solicitar')
.get(distribucionFuncionPF.solicitud)

router.route('/historial')
.get(distribucionFuncionPF.historial)

module.exports = router;