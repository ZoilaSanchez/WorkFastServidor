const AprobacionMP = require("../models/aprobacionMP");
const ProductoBD = require("../models/producto");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


module.exports = {
  //Registrar proveedor
  registrarAprobacionMP: async (req, res) => {
    idProdu = req.body.idProducto
    console.log(idProdu)
    if (typeof idProdu == "undefined" || idProdu==null || idProdu=="") {
      return response.responseError(res,code.BAD_REQUEST,"Id no encontrado");
    }
    lote= req.body.lote
    if (typeof lote == "undefined" || lote==null || lote=="") {
      return response.responseError(res,code.BAD_REQUEST,"Lote no encontrado");
    }

    defectos= req.body.defectos
    if (typeof defectos == "undefined" || defectos==null || defectos=="") {
      return response.responseError(res,code.BAD_REQUEST,"cantidad de defectos no encontrado");
    }

    // Buscar condiciones de acuerdo al ID del producto
    const productoBD=await ProductoBD.findById(idProdu);
    if (!productoBD) {
      return response.responseError(res,code.BAD_REQUEST,"Producto no encontrado");
    }

    //Parametros para evaluar y realizar el calculo
    const nivelConfianza = productoBD.nc 
    const procentajeError= productoBD.error 
    const probabilidadExito = productoBD.exito 
    const probabilidadFracaso= 1 - probabilidadExito
    const porcentajeAcepta= productoBD.acepta 
    
    const tamMuestra = calcularMuestra(lote,nivelConfianza,probabilidadExito,probabilidadFracaso,procentajeError)
    const resultadoProducto =  Math.round(tamMuestra*porcentajeAcepta)
    var status=true
    if(resultadoProducto<= defectos){
      console.log("rechazar")
      status=false
    }

    const aprobacionMP = new AprobacionMP({
      idProducto: idProdu,
      nombreProducto: productoBD.nombre ,
      loteIngreso: lote,
      defectosIngreso: defectos,
      tamañoLote: tamMuestra,
      estado: status,
      cantidadReal: resultadoProducto,
      cantidadAceptar: defectos
    }) 
    try {
      await aprobacionMP.save()
      return response.response(res,code.CREATED,"Aprobacion MP Registrada Correctamente",aprobacionMP);
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