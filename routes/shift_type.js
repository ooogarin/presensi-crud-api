var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.shift_type.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.shift_type.getDataById,
controller.shift_type.getById);

// POST
router.post('/',
    authLogin,
    validationRules.shift_type.insertData,
controller.shift_type.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.shift_type.deleteById,
controller.shift_type.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.shift_type.updateById,
controller.shift_type.update);



module.exports = router;
