const express = require('express');
const { Router } = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next)=>{
mysql.getConnection((error, conn)=>{
    if(error){return res.status(500).send({error:error});}

    conn.query(
        'SELECT * FROM produtos;',
        (error, resultado, fields)=>{
            conn.release();
            if(error){return res.status(500).send({error:error});}

            return res.status(200).send({response:resultado});

        }
    )
});
   
});

// CRIA UM PRODUTO 
router.post('/',(req,res,next)=>{

    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error});}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES(?,?)',
            [req.body.nome,req.body.preco],
            (error, resultado, field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error});}
                res.status(201).send({
                    mensagem:'Produto Inserido com sucesso',
                    id_produto:resultado.insertId,
                });
            }

        )
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