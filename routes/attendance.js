var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.attendance.getAll);

// GET - detil by id
router.get('/:id',
    authLogin,
    validationRules.attendance.findId,
controller.attendance.getDetilAttendance);



module.exports = router;
