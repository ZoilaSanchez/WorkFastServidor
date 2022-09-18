const { Schema, model } = require('mongoose')

const aprobacionMP = new Schema({
    "idProducto": {
        type: Schema.Types.ObjectId,
        ref: "Producto"
      }, 
    "nombreProducto": String,
    "loteIngreso": Number,
    "defectosIngreso": Number,
    "tamañoLote": Number,
    "estado": String,
    "cantidadReal": Number,
    "cantidadAceptar": Number,
    "observacion": String
},
{
    timestamps: true,
});

module.exports = model('AprobacionMP', aprobacionMP)
 