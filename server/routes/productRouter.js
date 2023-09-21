const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();


router.get('/', productController.fetchAll);
router.get('/:id', productController.fetchById);
router.post('/', authController.authorizeAdmin, productController.save);
router.put('/:id', productController.update);
router.delete('/:id', productController.deleteById);



module.exports = router;