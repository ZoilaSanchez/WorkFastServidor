const mongoose= require('mongoose')

const URI=process.env.MONGODB_URI

mongoose.connect(URI) 

const connection=mongoose.connection;

connection.once('open',()=>{
    console.log('BD Conectada correctamente a - ',URI);
})


