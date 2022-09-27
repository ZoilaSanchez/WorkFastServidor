const UsuarioBD = require("../models/usuario");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 
const autenticacion=require('../general/metodos_generales')
const generarJwt=require('../general/generarJWT')


module.exports = {
  //Registrar producto
  registrarUsuario: async (req, res) => {
    nombreUsuario = req.body.nombre[0].toUpperCase() + req.body.nombre.slice(1)
    nombrePuesto = req.body.puesto[0].toUpperCase() + req.body.puesto.slice(1)
    
    emailBody = req.body.email
    console.log(emailBody)
    const existeUsuario = await UsuarioBD.findOne({ email: emailBody });
    console.log(existeUsuario)
    if (existeUsuario!=null) {
        console.log("usuario existe")
        return response.responseError(res,code.BAD_REQUEST,"Usuario ya existe");
    }
    
    const usuarioBD = new UsuarioBD({
      nombre: nombreUsuario,
      contraseña: req.body.contraseña,
      email: req.body.email,
      puesto: nombrePuesto

}) 
    try {
      await usuarioBD.save()
      console.log("estmos dento")
      console.log( usuarioBD._id)
      data = {
        _id: usuarioBD._id,
        nombre: usuarioBD.nombre,
        email: usuarioBD.email,
        puesto:  usuarioBD.puesto,
        token: generarJwt(usuarioBD._id),
      }
      return response.response(res,code.CREATED,"Usuario Registrado Correctamente",data);
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
    emailVerifi = req.body.email
    const existeUsuario = await UsuarioBD.findOne({email: emailVerifi });
    if (existeUsuario) {
        return response.responseError(res,code.BAD_REQUEST,"Email ya utilizado");
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
        data = {
          _id: usuarioBD._id,
          nombre: usuarioBD.nombre,
          email: usuarioBD.email,
          puesto:  usuarioBD.puesto,
          token: generarJwt(usuarioBD._id),
        }
        return response.response(res,code.ACCEPTED,"Usuario Actualizado Correctamente",data);
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
    },

    login: async (req, res) => {
      const {email, contraseña } = req.body;
    
      //comprobando si el usuario existe
      const usuario = await UsuarioBD.findOne({ email: email });
    
      if (!usuario) {
        return response.responseError(res,code.BAD_REQUEST,"Usuario no encontrado");
      }
      
      if (usuario.email.toString() !== req.body.email.toString()) {
          return response.responseError(res,code.BAD_REQUEST,"Email incorrecto");
        }
  
      // Revisar al password
      if (await usuario.comprobarPassword(contraseña)) {
        data = {
          _id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          puesto:  usuario.puesto,
          token: generarJwt(usuario._id),
        }

        return response.response(res,code.ACCEPTED,"Bienvendio a WorkFast",data);


      } else {
        return response.responseError(res,code.BAD_REQUEST,"Contraseña Incorrecta");
      }
    }
    
};
