const ProductoBD = require("../models/producto");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


module.exports = {
  //Registrar producto
  registrarProducto: async (req, res) => {
    nombreProducto = req.body.nombre[0].toUpperCase() + req.body.nombre.slice(1)
    dimensionProducto = req.body.dimensiones[0].toUpperCase() + req.body.dimensiones.slice(1)
    nivelConfianza = 0
    if( req.body.nc!=null){

      if(req.body.nc == 90){
        nivelConfianza=1.64
      }
      if(req.body.nc == 95){
        nivelConfianza=1.96
      }
      if(req.body.nc == 99){
        nivelConfianza=5.58
      }

    }
    porError = 0
    if( req.body.error!=null){
      porError = req.body.error/100
    }
    porExito = 0
    if( req.body.exito!=null){
      porExito = req.body.exito/100
    }
    porAceptar = 0
    if( req.body.acepta!=null){
      porAceptar = req.body.acepta/100
    }


    const productoBD = new ProductoBD({
        nombre: nombreProducto,
        precio: req.body.precio,
        unidades: req.body.unidades,
        dimensiones: dimensionProducto,
        nc:nivelConfianza,
        error: porError,
        exito: porExito,
        acepta: porAceptar
}) 
    try {
      await productoBD.save()
      return response.response(res,code.CREATED,"Producto Registrado Correctamente",productoBD);
    } catch (error) {
      return response.responseError(res,code.BAD_REQUEST,error.mensaje);
    }

  },

  //Modificar Datos del producto
  actualizarProducto: async (req, res) => {
    const { id } = req.headers;
    if (typeof id == "undefined" || id =="") {
        return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
    }
    const productoBD=await ProductoBD.findById(id);
    if (!productoBD) {
        return response.responseError(res,code.BAD_REQUEST,"Producto no encontrado");
    }
    nombreProducto = ""
    if(req.body.nombre!=null){
      nombreProducto = req.body.nombre[0].toUpperCase() + req.body.nombre.slice(1)
    }

    dimensionProducto = ""
    if(req.body.dimensiones!=null){
      dimensionProducto = req.body.dimensiones[0].toUpperCase() + req.body.dimensiones.slice(1)
    }
   

    productoBD.nombre = nombreProducto || productoBD.nombre;
    productoBD.precio = req.body.precio || productoBD.precio;
    productoBD.unidades = req.body.unidades || productoBD.unidades;
    productoBD.dimensiones =dimensionProducto || productoBD.dimensiones;
    productoBD.nc = req.body.nc || productoBD.nc;
    productoBD.error = req.body.error || productoBD.error;
    productoBD.exito = req.body.exito || productoBD.exito;
    productoBD.acepta = req.body.acepta || productoBD.acepta;
 
    try {
        await productoBD.save()
        return response.response(res,code.ACCEPTED,"Producto Actualizado Correctamente",productoBD);
      } catch (error) {
        return response.responseError(res,code.BAD_REQUEST,"Problema al guardar");
      }
    },

    // Obtener todos los producto ordenados por tiempo
    obtenerProducto: async (req, res) => {
        const productoBD=await ProductoBD.find().sort({nombre: 1});
        return response.response(res,code.ACCEPTED,"Todos los proveedores",productoBD);
    },

    // Obtener informacion de 1 producto
    obtenerProductoIndividual: async (req, res) => {
        const { id } = req.headers;
        if (typeof id == "undefined" || id =="") {
            return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
        }
        const productoBD=await ProductoBD.findById(id);
        if (!productoBD) {
          return response.responseError(res,code.BAD_REQUEST,"Producto no encontrado");
        }
        return response.response(res,code.ACCEPTED,"Informacion de Producto",productoBD);
    }  
};