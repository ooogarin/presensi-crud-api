var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.role.getAll);

// POST - create role
router.post('/',
    authLogin,
    validationRules.role.insertData,
controller.role.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.role.findId,
controller.role.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.role.updateById,
controller.role.update);



module.exports = router;
