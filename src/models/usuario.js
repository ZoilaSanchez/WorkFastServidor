const { Schema, model } = require('mongoose')
const autenticacion=require('../general/metodos_generales')
const bcrypt = require('bcrypt')

const usuarioSchema = new Schema({
    "email": String,
    "contraseña": String,
    "nombre": String,
    "puesto": String,
    "token": {
        type: String,
        default: autenticacion()
      },
},
{
    timestamps: true,
});

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("contraseña")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
  });
  
  usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.contraseña);
  };

module.exports = model('Usuario', usuarioSchema)
 