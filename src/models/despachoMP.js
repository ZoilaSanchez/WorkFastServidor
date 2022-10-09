const { Schema, model } = require('mongoose')

const despachoMP = new Schema({
    "idProducto": {
        type: Schema.Types.ObjectId,
        ref: "Producto"
      }, 
    "nombreProducto": String,
    "cantidadSolicitar": Number,
    "dimension": String,
    "status": Boolean
},
{
    timestamps: true,
});

module.exports = model('despachoMP', despachoMP)
 