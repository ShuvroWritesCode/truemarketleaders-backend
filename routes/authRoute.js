const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
