var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.account_level.getAll);

// POST
router.post('/',
    authLogin,
    validationRules.account_level.insertData,
controller.account_level.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.account_level.findId,
controller.account_level.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.account_level.updateById,
controller.account_level.update);



module.exports = router;
