const {Router} = require('express')

const router = Router();

const distribucionFuncionPF = require('../controllers/distribucion')

router.route('/')
.post(distribucionFuncionPF.generarOrdenPF)



module.exports = router;