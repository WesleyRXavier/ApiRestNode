const express = require('express');
const { Router } = require('express');
const router = express.Router();


//RETORNA TODOS OS PEDIDO
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Usando o GET dentro da rota pedido',
    });
});

// CRIA UM PEDIDO 
router.post('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'Usando POST na rota pedido',
    });
});


// RETORNO UM PEDIDO ESPECIFICO
router.get('/:id_pedido',(req,res,next)=>{
    const id = req.params.id_produto;
    var mensagem= 'id diferente de 1';

    if(id == 1){
        mensagem ='id e igual a 1';
    }
    res.status(200).send({
        mensagem:mensagem,
        id: id,
    });
});

//ALTERANDO 
router.patch('/',(req,res,next)=>{
    res.status(201).send({
        mensagem: 'Usando patch aletrando um pedido',
    })
})

//DELETANDO 
router.delete('/', (req,res,next)=>{
    res.status(201).send({
        mensagem:' Usando odelete na rota pedido',

    })
})
module.exports = router;