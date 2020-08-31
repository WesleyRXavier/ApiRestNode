const express = require('express');
const { Router } = require('express');
const router = express.Router();


//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Usando o GET dentro da rota produtos',
    });
});

// CRIA UM PRODUTO 
router.post('/',(req,res,next)=>{
    res.status(201).send({
        mensagem:'Usando POST na rota Produtos',
    });
});


// RETORNO UM PRODUTOS ESPECIFICO
router.get('/:id_produto',(req,res,next)=>{
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
        mensagem: 'Usando patch aletrando um produto',
    })
})

//DELETANDO 
router.delete('/', (req,res,next)=>{
    res.status(201).send({
        mensagem:' Usando odelete na rota Produtos',

    })
})
module.exports = router;