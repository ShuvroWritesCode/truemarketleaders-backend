const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

router.get('/show', dataController.getAllTickers);
router.get('/hello', dataController.hello);
module.exports = router;
