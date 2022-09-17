const { Schema, model } = require('mongoose')

const proveedor = new Schema({
    "nombre": String,
    "telefono": String,
    "direccion": String
},
{
    timestamps: true,
});

module.exports = model('Proveedor', proveedor)
 