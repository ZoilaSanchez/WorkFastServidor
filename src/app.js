const express = require('express')
const cors=require('cors') 
const morgan = require('morgan')
const fileUp = require('express-fileupload')
const app=express()


// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.json())

//Recibir archivos
app.use(fileUp({
    useTempFiles: true, //Guarde en memoria
    tempFileDir: process.env.LOCATION //Subir en uploads
}));

//Configuraciones
app.set('port',process.env.PORT || 8000 ) //8000

app.get('/',(req,res)=>{
    res.send('Bienvenidos a WorkFast')
})

//Rutas para la coleccion de los datos
const autenticacion=require("./general/rutas_protegidas")

app.use('/api/hello',require('./routes/hello'));
app.use('/api/proveedor',autenticacion, require('./routes/proveedor'));
app.use('/api/producto',autenticacion, require('./routes/producto'));
app.use('/api/usuario',require('./routes/usuario'));

// app.use('/api/muestreo',require('./routes/muestreoRouter'));
// app.use('/api/orden/muestreo',require('./routes/ordenMuestreoRouter'));
// app.use('/api/telegram',require('./routes/telegramRouter'));
// app.use('/api/orden',require('./routes/ordenRouter'));
//Privadas

module.exports =app;