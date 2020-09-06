const express = require('express');
const { Router } = require('express');
const router = express.Router();
const login = require('../middleware/login');

const ProdutosController = require('../controllers/produtosController');

//RETORNA TODOS OS PRODUTOS
router.get('/', ProdutosController.getProdutos);

// CRIA UM PRODUTO 
router.post('/',login.obrigatorio,ProdutosController.postProdutos);


// RETORNO UM PRODUTOS ESPECIFICO
router.get('/:id_produto',ProdutosController.getUmProduto);

//ALTERANDO 
router.patch('/',login.obrigatorio, ProdutosController.updateProduto);

//DELETANDO 
router.delete('/',login.obrigatorio, ProdutosController.deleteProduto);


module.exports = router;