const UsuarioBD = require("../models/usuario");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


module.exports = {
  //Registrar producto
  registrarUsuario: async (req, res) => {
    nombreUsuario = req.body.nombre[0].toUpperCase() + req.body.nombre.slice(1)
    nombrePuesto = req.body.puesto[0].toUpperCase() + req.body.puesto.slice(1)
    const usuarioBD = new UsuarioBD({
      nombre: nombreUsuario,
      contraseña: req.body.precio,
      email: req.body.email,
      puesto: nombrePuesto

}) 
    try {
      await usuarioBD.save()
      return response.response(res,code.CREATED,"Usuario Registrado Correctamente",usuarioBD);
    } catch (error) {
      return response.responseError(res,code.BAD_REQUEST,error.mensaje);
    }

  },

  //Modificar Datos del producto
  actualizarUsuario: async (req, res) => {
    const { id } = req.headers;
    if (typeof id == "undefined" || id =="") {
        return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
    }
    const usuarioBD=await UsuarioBD.findById(id);
    if (!usuarioBD) {
        return response.responseError(res,code.BAD_REQUEST,"Usuario no encontrado");
    }
    nombreUsuario = ""
    if(req.body.nombre!=null){
      nombreUsuario = req.body.nombre[0].toUpperCase() + req.body.nombre.slice(1)
    }

    nombrePuesto = ""
    if(req.body.puesto!=null){
      nombrePuesto = req.body.puesto[0].toUpperCase() + req.body.puesto.slice(1)
    }
   
    usuarioBD.nombre = nombreUsuario || usuarioBD.nombre;
    usuarioBD.puesto = nombrePuesto || usuarioBD.puesto;
    usuarioBD.email = req.body.email || usuarioBD.email;
    usuarioBD.contraseña = req.body.contraseña  || usuarioBD.contraseña;
 
    try {
        await usuarioBD.save()
        return response.response(res,code.ACCEPTED,"Usuario Actualizado Correctamente",usuarioBD);
      } catch (error) {
        return response.responseError(res,code.BAD_REQUEST,"Problema al guardar");
      }
    },

    // Obtener informacion de 1 producto
    obtenerUsuarioIndividual: async (req, res) => {
        const { id } = req.headers;
        if (typeof id == "undefined" || id =="") {
            return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
        }
        const usuarioBD=await UsuarioBD.findById(id);
        if (!usuarioBD) {
          return response.responseError(res,code.BAD_REQUEST,"Usuario no encontrado");
      }
        return response.response(res,code.ACCEPTED,"Informacion de Usuario",usuarioBD);
    }
    
};