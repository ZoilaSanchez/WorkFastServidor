const ProveedorBD = require("../models/proveedor");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


module.exports = {
  //Registrar proveedor
  registrarProveedor: async (req, res) => {
    nombreProveedor = req.body.nombre[0].toUpperCase() + req.body.nombre.slice(1)
    const proveedorDB = new ProveedorBD({
        nombre: nombreProveedor,
        telefono: req.body.telefono,
        direccion: req.body.direccion
}) 
    try {
      await proveedorDB.save()
      return response.response(res,code.CREATED,"Proveedor Registrado Correctamente",proveedorDB);
    } catch (error) {
      return response.responseError(res,code.BAD_REQUEST,error.mensaje);
    }

  },

  //Modificar Datos del proveedor
  actualizarProveedor: async (req, res) => {
    const { id } = req.headers;
    if (typeof id == "undefined"  || id =="") {
        return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
    }
    const proveedorDB=await ProveedorBD.findById(id);
    if (!proveedorDB) {
        return response.responseError(res,code.BAD_REQUEST,"Proveedor no encontrado");
    }
    nombreProveedor = ""
    if(req.body.nombre!=null){
        nombreProveedor = req.body.nombre[0].toUpperCase() + req.body.nombre.slice(1)
    }
   

    proveedorDB.nombre = nombreProveedor || proveedorDB.nombre;
    proveedorDB.telefono = req.body.telefono || proveedorDB.telefono;
    proveedorDB.direccion = req.body.direccion || proveedorDB.direccion;
 
    try {
        await proveedorDB.save()
        return response.response(res,code.ACCEPTED,"Proveedor Actualizado Correctamente",proveedorDB);
      } catch (error) {
        return response.responseError(res,code.BAD_REQUEST,"Problema al guardar");
      }
    },

    // Obtener todos los proveedores ordenados por tiempo
    obtenerProveedor: async (req, res) => {
        const proveedorBD=await ProveedorBD.find().sort({nombre: 1});
        return response.response(res,code.ACCEPTED,"Todos los proveedores",proveedorBD);
    },

    // Obtener informacion de 1 proveedor
    obtenerProveedorIndividual: async (req, res) => {
        const { id } = req.headers;
        if (typeof id == "undefined" || id =="") {
            return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
        }
        const proveedorBD=await ProveedorBD.findById(id);
        return response.response(res,code.ACCEPTED,"Informacion de Proveedor",proveedorBD);
    }  
};