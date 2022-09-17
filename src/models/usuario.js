const { Schema, model } = require('mongoose')

const usuario = new Schema({
    "email": String,
    "contraseña": String,
    "nombre": String,
    "puesto": String,
},
{
    timestamps: true,
});

module.exports = model('Usuario', usuario)
 