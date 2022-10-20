const DistribucionPF = require("../models/distribucion");
const ProductoBDPF = require("../models/productoFinal");
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


module.exports = {
  //Registrar orden
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
      unidades: req.body.unidades,
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
  aprobacionOrden: async (req, res) => {
    id = req.body.idOrden
    if (typeof id == "undefined"  || id =="" || id==null) {
        return response.responseError(res,code.BAD_REQUEST,"headers no encontrado");
    }
    const distribucionPF=await DistribucionPF.findById(id);
 
    if (!distribucionPF) {
        return response.responseError(res,code.BAD_REQUEST,"Orden no encontrada");
    }
    distribucionPF.comentario = req.body.comentario || distribucionPF.comentario;
    distribucionPF.estado = req.body.estado || distribucionPF.estado;
    // aumentar inventario
    if( req.body.estado==1 ){
      idProdu =  distribucionPF.idProducto;
      const productoBD=await ProductoBDPF.findById(idProdu);
      if (productoBD) {
        inventarioActual = productoBD.unidades
        productoBD.unidades = inventarioActual - distribucionPF.unidades
        await productoBD.save()
      }
    }
    try {
        await distribucionPF.save()
        return response.response(res,code.ACCEPTED,"Orden Actualizada Correctamente",distribucionPF);
      } catch (error) {
        return response.responseError(res,code.BAD_REQUEST,"Problema al guardar");
      }
    },
    
    //Entrega FAbrica - Mayorista
    entregas: async (req, res) => {
      tipoEntrega = req.body.tipo
      if(tipoEntrega==1){ // entregas de fabrica
        const productoBD=await DistribucionPF.find({ tipoDistribucion: 2, estado:3 }).sort({createdAt: -1});
        return response.response(res,code.ACCEPTED,"Entregar de Fabrica a mayorista ",productoBD);
      }
      else if (tipoEntrega==2){//entregas de mayorista
        const productoBD=await DistribucionPF.find({ tipoDistribucion: 1, estado:3 }).sort({createdAt: -1});
        return response.response(res,code.ACCEPTED,"Entregar de Mayorista a Minorista ",productoBD);
      }
      
    },

    historial: async (req, res) => {
      tipoEntrega = req.body.tipo
      if(tipoEntrega==2){ //Historial entregas Mayorista - a minorista
        const productoBD=await DistribucionPF.find({ tipoDistribucion: 1, estado:{"$in": [1,2]} }).sort({createdAt: -1});
        return response.response(res,code.ACCEPTED,"Historial de Mayorista ",productoBD);
      }
      else if (tipoEntrega==1){//Historial entregas Fabrica - a mayorista
        const productoBD=await DistribucionPF.find({ tipoDistribucion: 2,estado:{"$in": [1,2] }}).sort({createdAt: -1});
        return response.response(res,code.ACCEPTED,"Historial de Fabrica ",productoBD);
      }
      
    },

};