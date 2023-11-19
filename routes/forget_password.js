var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const authLogin = require('../config/middlewares/isLogin');

// POST - forget password
router.post('/', controller.forget_password.forgetPassword);

module.exports = router;