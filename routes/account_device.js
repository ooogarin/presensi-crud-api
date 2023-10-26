var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.account_device.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.account_device.getDataById,
controller.account_device.getById);

// POST
router.post('/',
    authLogin,
    validationRules.account_device.insertData,
controller.account_device.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.account_device.deleteById,
controller.account_device.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.account_device.updateById,
controller.account_device.update);



module.exports = router;
