const {Router} = require('express')

const router = Router();

const usuarioFunc = require('../controllers/usuario')

router.route('/')
.post(usuarioFunc.registrarUsuario)
.put(usuarioFunc.actualizarUsuario)
.get(usuarioFunc.obtenerUsuarioIndividual)


module.exports = router;