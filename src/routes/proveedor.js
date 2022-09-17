const {Router} = require('express')

const router = Router();

const proveedorFunc = require('../controllers/proveedor')

router.route('/')
.post(proveedorFunc.registrarProveedor)
.put(proveedorFunc.actualizarProveedor)
.get(proveedorFunc.obtenerProveedor)

router.route('/individual')
.get(proveedorFunc.obtenerProveedorIndividual)

module.exports = router;