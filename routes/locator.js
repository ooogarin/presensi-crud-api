var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.locator.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.locator.getDataById,
controller.locator.getById);

// POST
router.post('/',
    authLogin,
    validationRules.locator.insertData,
controller.locator.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.locator.deleteById,
controller.locator.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.locator.updateById,
controller.locator.update);



module.exports = router;
