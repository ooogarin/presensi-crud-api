var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.attendance.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.attendance.getDataById,
controller.attendance.getById);

// POST
router.post('/',
    authLogin,
    validationRules.attendance.insertData,
controller.attendance.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.attendance.deleteById,
controller.attendance.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.attendance.updateById,
controller.attendance.update);



module.exports = router;
