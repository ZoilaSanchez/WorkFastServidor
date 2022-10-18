const { Schema, model } = require('mongoose')

const despachoMP = new Schema({
    "idProducto": {
        type: Schema.Types.ObjectId,
        ref: "Producto"
      }, 
    "nombreProducto": String,
    "cantidadSolicitar": Number,
    "dimension": String,
    "status": Number // 1 Proceso 2 Cancelada 3 Aceptada
},
{
    timestamps: true,
});

module.exports = model('despachoMP', despachoMP)
 