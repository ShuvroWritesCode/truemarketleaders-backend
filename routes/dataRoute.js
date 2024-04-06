const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

router.post('/show', dataController.getChart);
router.get('/breakoutReport', dataController.getOneBreakout);
// router.get('/ticker', dataController.getAllTickers);
router.get('/details', dataController.getAllTickersWithDetails);
module.exports = router;
