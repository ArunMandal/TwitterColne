const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();


router.get('/', categoryController.fetchAll);




module.exports = router;