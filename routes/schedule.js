var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all schedule
router.get('/schedule',
    authLogin,
controller.schedule.getAllSchedule);


// ----------------------------------------------------------------------------------------------------
// get shifting (shift turn, shift type)
router.get('/shifting',
    authLogin,
controller.schedule.getShifting);

// get division
router.get('/division',
    authLogin,
controller.schedule.getDivision);

// ----------------------------------------------------------------------------------------------------
// GET - all
router.get('/',
    authLogin,
controller.schedule.getAll);

// GET - detil by id
router.get('/:id',
    authLogin,
    validationRules.schedule.findId,
controller.schedule.getDetilSchedule);

// POST
router.post('/',
    authLogin,
    validationRules.schedule.insertData,
controller.schedule.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.schedule.delete,
controller.schedule.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.schedule.updateById,
controller.schedule.update);



module.exports = router;
