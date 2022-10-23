const {Router} = require('express')

const router = Router();

const productoFunc = require('../controllers/producto')

router.route('/')
.post(productoFunc.registrarProducto)
.put(productoFunc.actualizarProducto)
.get(productoFunc.obtenerProducto)


router.route('/individual')
.get(productoFunc.obtenerProductoIndividual)


/// Producto final

router.route('/final')
.post(productoFunc.registrarProductoFinal)
.put(productoFunc.actualizarProductoFinal)
.get(productoFunc.obtenerProductoFinal)

router.route('/final/individual')
.get(productoFunc.obtenerProductoIndividualFinal)

//Alertas por telegram
router.route('/telegram')
.post(productoFunc.revisionUnidadesMateriaPrima)

module.exports = router;