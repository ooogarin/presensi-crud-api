var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - profile
router.get('/',
    authLogin,
controller.profile.getProfile);

// PUT - update profile
router.put('/update-profile',
    authLogin,
    validationRules.profile.updateById,
controller.profile.update);

// PUT - change password
router.put('/change-password',
    authLogin,
    validationRules.profile.changePassword,
controller.profile.updatePassword);



module.exports = router;
