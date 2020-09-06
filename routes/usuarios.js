const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/cadastro', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query('SELECT * FROM usuarios WHERE email= ?', [req.body.email],
            (error, results) => {
                if (error) { return res.status(500).send({ error: error }); }
                if (results.length > 0) {
                    return res.status(409).send({
                        mensagem: 'Usuario ja existe',
                    })
                } else {

                    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                        if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                        conn.query(`INSERT INTO usuarios(email, senha) VALUES (?,?)`,
                            [req.body.email, hash],
                            (error, results) => {
                                conn.release();
                                if (errBcrypt) { return res.status(500).send({ error: error }) }
                                return res.status(201).send({
                                    mensagem: 'usuario criado com sucess',
                                    usuarioCriado: {
                                        idUsuario: results.insertID,
                                        email: req.body.email,
                                    }
                                })

                            }
                        )
                    });
                }
            });
    });

});

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        const query = 'SELECT * FROM usuarios WHERE  email = ?';
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }); }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'falha na autenticacao' });
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'falha na autenticacao' });
                }

                if (result) {

                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).send({
                        mensagem: 'autenticado com sucessso',
                        token: token

                    });
                }
                //se nao der erro e a senha nao for certa
                return res.status(401).send({ mensagem: 'falha na autenticacao senha errada' });
            });
        })
    })
});

module.exports = router;