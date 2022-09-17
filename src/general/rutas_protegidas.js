const jwt = require('jsonwebtoken')
const Usuario=require('../models/usuario')
const response = require('../response/response')
const code = require('../response/code').CodeResponse 

const checkAuth = async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
     
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        req.usuario = await Usuario.findById(decoded.id);

        return next();
      } catch (error) {
        return response.responseError(res,code.BAD_REQUEST,"Token no valido");
      }
    }
  
    if (!token) {
      return response.responseError(res,code.BAD_REQUEST,"Token no valido o inexistente");
    }
  
    next();
  };


  




module.exports = checkAuth;