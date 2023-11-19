var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');

// ----- MOBILE -----
// GET - pre-attendance
router.get('/:id', 
    authLogin,
controller.m_attendance.preAttendance);

// POST - pre-attendance
router.post('/:id', 
    authLogin,
    validationRules.attendance.insertData,
controller.m_attendance.insertData);


module.exports = router;
