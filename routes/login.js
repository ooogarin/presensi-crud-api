var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const authLogin = require('../config/middlewares/isLogin');

// POST - Login
router.post('/', controller.login.login);

module.exports = router;