const usarCtrl= {};

const response = require('../response/response')
const code = require('../response/code').CodeResponse 

usarCtrl.hello=async(req,res)=>{
    myJSON = { "name": "Chris", "age": "38" };
    return response.response(res,code.ACCEPTED,"Proceso terminado",myJSON);
};

usarCtrl.helloError=async(req,res)=>{
    return response.responseError(res,code.BAD_REQUEST,"Proceso fallo");
};

module.exports = usarCtrl;