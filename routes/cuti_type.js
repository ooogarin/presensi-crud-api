var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.cuti_type.getAll);

// POST
router.post('/',
    authLogin,
    validationRules.cuti_type.insertData,
controller.cuti_type.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.cuti_type.findId,
controller.cuti_type.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.cuti_type.updateById,
controller.cuti_type.update);



module.exports = router;
