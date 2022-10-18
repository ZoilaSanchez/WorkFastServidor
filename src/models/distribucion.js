const { Schema, model } = require('mongoose')

const distribucionPF = new Schema({
    "idProducto": {
        type: Schema.Types.ObjectId,
        ref: "ProductoFinal"
      }, 
    "nombreProducto": String,
    "unidades": Number,
    "empresa": String,
    "fechaEntrega": Date,
    "tipo": Number, 
    /* 
     * Solicitar (1)
     * Entrega(2)
    */
    "tipoDistribucion": Number,
    /*
     * Minorista-Mayorista (1)
     * Mayorista-Fabrica (2)
    */

    "estado": Number 
    /*
     * Aceptar(1)
     * Cancelar(2)
     * Proceso(3)
    */
},
{
    timestamps: true,
});

module.exports = model('DistribucionPF', distribucionPF)
 