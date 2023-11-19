var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');

// ----- MOBILE -----

// GET - dashboard mobile
router.get('/',
    authLogin,
controller.m_dashboard.dashboard);



module.exports = router;
