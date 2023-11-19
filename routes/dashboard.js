var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - dashboard
router.get('/',
    authLogin,
controller.dashboard.dashboard);



module.exports = router;
