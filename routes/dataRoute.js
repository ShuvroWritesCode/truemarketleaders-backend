const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

router.get('/show', dataController.getChart);
router.get('/breakoutReport', dataController.getOneBreakout);
// router.get('/ticker', dataController.getAllTickers);
router.get('/details', dataController.getAllTickersWithDetails);
module.exports = router;
