const DistribucionPF = require("../models/distribucion");
const ProductoBDPF = require("../models/productoFinal");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


module.exports = {
  //Registrar proveedor
  generarOrdenPF: async (req, res) => {
    idProdu = req.body.idProducto

    if (typeof idProdu == "undefined" || idProdu==null || idProdu=="") {
      return response.responseError(res,code.BAD_REQUEST,"Id no encontrado");
    }

    // Buscar condiciones de acuerdo al ID del producto
    const productoBD=await ProductoBDPF.findById(idProdu);
    if (!productoBD) {
      return response.responseError(res,code.BAD_REQUEST,"Producto no encontrado");
    }
    var myDate = new Date().toISOString();
    console.log(myDate);
    const distribucionPF = new DistribucionPF({
      idProducto: idProdu,
      nombreProducto: productoBD.nombre,
      unidades: req.body.cantidad,
      empresa: req.body.empresa,
      fechaEntrega: myDate,
      tipo: 1,
      tipoDistribucion: req.body.tipo ,
      estado: 3,
    }) 
    try {
      await distribucionPF.save()
      return response.response(res,code.CREATED,"Orden Generada",distribucionPF);
    } catch (error) {
      return response.responseError(res,code.BAD_REQUEST,error.mensaje);
    }

  },

  //Modificar Datos del proveedor
  observacionAprobacionMP: async (req, res) => {
    id = req.body.idOrden
    if (typeof id == "undefined"  || id =="" || id==null) {
        return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
    }
    const aprobacionMP=await AprobacionMP.findById(id);
    if (!aprobacionMP) {
        return response.responseError(res,code.BAD_REQUEST,"Orden no encontrada");
    }

    aprobacionMP.observacion = req.body.observacion || aprobacionMP.observacion;

    // aumentar inventario
    if(aprobacionMP.estado=="True" || aprobacionMP.estado == true){
      inventarioAumentar =  aprobacionMP.loteIngreso;
      idProdu =  aprobacionMP.idProducto;

      const productoBD=await ProductoBD.findById(idProdu);
      if (productoBD) {
        inventarioActual = productoBD.unidades

        productoBD.unidades = inventarioAumentar + inventarioActual
        await productoBD.save()

      }
    }
 
    try {
        await aprobacionMP.save()
        return response.response(res,code.ACCEPTED,"Orden Actualizada Correctamente",aprobacionMP);
      } catch (error) {
        return response.responseError(res,code.BAD_REQUEST,"Problema al guardar");
      }
    }  
};

function calcularMuestra(lote,nc,p,q,errorPorcentaje) {
  const n = (lote*Math.pow(nc,2)*p*q)/((Math.pow(errorPorcentaje,2)*(lote-1))+(Math.pow(nc,2)*p*q))
  return Math.round(n)
}