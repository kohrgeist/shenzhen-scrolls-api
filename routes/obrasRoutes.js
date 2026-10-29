const express = require('express');
const router = express.Router();
const obrasController = require('../controllers/obrasController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', obrasController.listarObras);
router.post('/', authMiddleware,obrasController.criarObra);
router.delete('/:id', authMiddleware, obrasController.deletarObra);

module.exports = router;