const {Router} = require('express')

const router = Router();

const productoFunc = require('../controllers/producto')

router.route('/')
.post(productoFunc.registrarProducto)
.put(productoFunc.actualizarProducto)
.get(productoFunc.obtenerProducto)

router.route('/individual')
.get(productoFunc.obtenerProductoIndividual)

module.exports = router;