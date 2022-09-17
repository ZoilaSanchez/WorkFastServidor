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
//Publicas
app.use('/api/hello',require('./routes/hello'));
// app.use('/api/producto',require('./routes/productoRouter'));
// app.use('/api/proveedor',require('./routes/proveedorRouter'));
// app.use('/api/muestreo',require('./routes/muestreoRouter'));
// app.use('/api/orden/muestreo',require('./routes/ordenMuestreoRouter'));
// app.use('/api/telegram',require('./routes/telegramRouter'));
// app.use('/api/orden',require('./routes/ordenRouter'));
//Privadas

module.exports =app;