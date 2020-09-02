const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');

router.post('/cadastro',(req,res,next)=>{

    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error});}
        conn.query('SELECT * FROM usuarios WHERE email= ?', [req.body.email],
       ( error, results )=>{
        if(error){return res.status(500).send({error:error});}
        if(results.length >0 ){
            return res.status(409).send({
                mensagem: 'Usuario ja existe',
            })
        }else{

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash)=>{
            if(errBcrypt){return res.status(500).send({error:errBcrypt})}
            conn.query(`INSERT INTO usuarios(email, senha) VALUES (?,?)`,
            [req.body.email, hash],
            (error, results)=>{
                conn.release();   
                 if(errBcrypt){return res.status(500).send({error:error})}
                 return res.status(201).send({
                     mensagem:'usuario criado com sucess',
                     usuarioCriado: {
                         idUsuario: results.insertID,
                         email:req.body.email,
                     }
                 })
                
            }
            )
        });
    }


       });
        
        
        
    });

});



module.exports = router;