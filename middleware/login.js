const jwt = require('jsonwebtoken');

exports.obrigatorio = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[0];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.usuario = decode;
        next();
    }catch(error){
        return res.status(401).send({mensagem:'Falha de autenticacao'});

    }
}
exports.opcional  = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[0];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.usuario = decode;
        next();
    }catch(error){
        return res.status(401).send({mensagem:'Falha de autenticacao'});

    }
}