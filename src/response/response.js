const { json } = require("express");

const usarCtrl= {};

usarCtrl.responseError= async(res,code,message) => {
    response="error"
    return res.status(code).json({response,error:{code,message}});
}
    
usarCtrl.response= async(res,code,message,data) => {
    response="ok"
    return res.status(code).json({response,data,message});
}

module.exports = usarCtrl;
