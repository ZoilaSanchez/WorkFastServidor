const despachoMP = require("../models/despachoMP");
const ProductoBD = require("../models/producto");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


module.exports = {
  //Registrar proveedor
  registrarDespachoMP: async (req, res) => {
    idProdu = req.body.idProducto
    if (typeof idProdu == "undefined" || idProdu==null || idProdu=="") {
      return response.responseError(res,code.BAD_REQUEST,"Id no encontrado");
    }

    const productoBD=await ProductoBD.findById(idProdu);
    if (!productoBD) {
        return response.responseError(res,code.BAD_REQUEST,"Producto no encontrado");
    }

    const despacho = new despachoMP({
      idProducto: idProdu,
      nombreProducto: productoBD.nombre ,
      cantidadSolicitar: req.body.cantidadSolicitar,
      dimension: req.body.dimension,
      status: 1
    }) 
    try {
      await despacho.save()
      return response.response(res,code.CREATED,"Despacho MP Registrada Correctamente",despacho);
    } catch (error) {
      return response.responseError(res,code.BAD_REQUEST,error.mensaje);
    }

  },


  aprobarDespachoMP: async (req, res) => {
    idOrden = req.body.idOrden
    if (typeof idOrden == "undefined" || idOrden==null || idOrden=="") {
      return response.responseError(res,code.BAD_REQUEST,"Id no encontrado");
    }

    const despacho=await despachoMP.findById(idOrden);
    if (!despacho) {
        return response.responseError(res,code.BAD_REQUEST,"Producto no encontrado");
    }

    despacho.status = req.body.status || despacho.status;

    try {
      await despacho.save()
      return response.response(res,code.CREATED,"Despacho MP actualizar estado Correctamente",despacho);
    } catch (error) {
      return response.responseError(res,code.BAD_REQUEST,error.mensaje);
    }

  },

   // Obtener todos los producto ordenados por tiempo
   obtenerOrdenLista: async (req, res) => {
    const orden=await despachoMP.find().sort({nombre: 1});
    return response.response(res,code.ACCEPTED,"Todos las ordenes de despacho",orden);
},

// Obtener informacion de 1 producto
obtenerOrdenFinal: async (req, res) => {
    const { id } = req.headers;
    if (typeof id == "undefined" || id =="") {
        return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
    }
    const orden=await despachoMP.findById(id);
    if (!orden) {
      return response.responseError(res,code.BAD_REQUEST,"Orden no encontrado");
    }
    return response.response(res,code.ACCEPTED,"Informacion de la orden de despacho",orden);
}  



 
};
