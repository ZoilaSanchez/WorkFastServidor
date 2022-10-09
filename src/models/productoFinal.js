const { Schema, model } = require('mongoose');

const producto = new Schema({
    "nombre": String,
    "precio": Number,
    "unidades": Number
},
{
    timestamps: true,
});

module.exports = model('ProductoFinal', producto)
 