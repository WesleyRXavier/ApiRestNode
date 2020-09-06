
const mysql = require('../mysql').pool;


exports.getProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }

        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }); }

                return res.status(200).send({ response: resultado });

            }
        )
    });

}

exports.postProdutos = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES(?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }); }
                res.status(201).send({
                    mensagem: 'Produto Inserido com sucesso',
                    id_produto: resultado.insertId,
                });
            }

        )
    });

}
exports.getUmProduto = (req, res, next) => {
    const id = req.params.id_produto;
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [id],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }); }
                if (resultado.length == 0) {
                    return res.status(404).send({
                        mensagem: "nao foi encontrado o produto",
                    })
                }
                return res.status(200).send({
                    response: resultado
                })
            }
        )
    })
}

exports.deleteProduto = (req, res, next) => {
    const id = req.body.id_produto;
    //
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [id],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }); }

                if (resultado.length == 0) {
                    return res.status(404).send({
                        mensagem: "nao foi encontrado o produto",
                    });
                }
                conn.query(
                    'DELETE FROM produtos WHERE id_produto = ?;',
                    [id],
                    (error, resultado, fields) => {
                        conn.release();
                        if (error) { return res.status(500).send({ error: error }); }
                        return res.status(202).send({
                            mensagem: 'produto deletado '
                        })
                    }
                )
            }
        )
    })

}

exports.updateProduto = (req,res,next)=>{
    const id = req.body.id_produto;
    const nome = req.body.nome;
    const preco = req.body.preco;
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error});}
        conn.query(
            `UPDATE produtos
             SET nome = ?,
                preco = ?   
            WHERE id_produto = ?`,
            [nome,preco, id],
            (error, resultado, fields)=>{
                conn.release();
                if(error){return res.status(500).send({error:error});}
                return res.status(202).send({
                    mensagem:"produto alterado",
                    
                });
            }
        )
    })
}