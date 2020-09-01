const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));//apenas dados simples
app.use(bodyParser.json());//so aceita entrada json
app.use((req,res,next)=>{
    res.header('Acces-Control-allow-Origin', '*');//permite acesso de todos os lugares , par restingir e so colocar o servidor no lugar do *
    res.header('Acces-Control-Header',
    'Origin, X-Requested-With,Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH,DELETE, GET');
        return res.status(200).send({

        })
    }
    next();
});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//QUANDO NAO ENCOTRA A ROTA
app.use((req,res,next)=>{
    const erro = new Error('Nao encontrada a rota');
    erro.status = 404;
    next(erro);
})


//RETORNA O ERRO 
app.use((error, req, res ,next)=>{
    res.status(error.status||500);
    return res.send({
        erro:{
            mensagem:error.message,

        }
    })
})

module.exports = app;