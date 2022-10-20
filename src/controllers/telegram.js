const usarCtrl= {};

const Teelgram= require('../models/telegramIds')
const response = require('../response/response')
const code = require('../response/code').CodeResponse 


usarCtrl.insertarID=async(req,res)=>{
    const telegram = new Teelgram(req.body);
    await telegram.save()
    response.response(res,code.CREATED,"Id Registrado",telegram);
};


module.exports = usarCtrl;