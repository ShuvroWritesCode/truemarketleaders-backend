const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/authenticate', authController.authenticate);

module.exports = router;
