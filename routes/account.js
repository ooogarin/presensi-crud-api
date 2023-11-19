var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    // authLogin,
controller.account.getAll);

// GET - by id
router.get('/:id',
    // authLogin,
    validationRules.account.findId,
controller.account.getDetilAccount);

// POST
router.post('/',
    // authLogin,
    validationRules.account.insertData,
controller.account.insertData);

// DELETE - by id
router.delete('/:id',
    // authLogin,
    validationRules.account.findId,
controller.account.delete);

// PUT
router.put('/:id',
    // authLogin,
    validationRules.account.updateById,
controller.account.update);





module.exports = router;
