const { Schema, model } = require('mongoose')

const proveedor = new Schema({
    "nombre": String,
    "precio": Number,
    "unidades": Number,
    "dimensiones": String,
    "nc": Number,
    "error": Number,
    "exito": Number,
    "acepta": Number 
},
{
    timestamps: true,
});

module.exports = model('Producto', proveedor)
 