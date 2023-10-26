var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.shift_turn.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.shift_turn.getDataById,
controller.shift_turn.getById);

// POST
router.post('/',
    authLogin,
    validationRules.shift_turn.insertData,
controller.shift_turn.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.shift_turn.deleteById,
controller.shift_turn.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.shift_turn.updateById,
controller.shift_turn.update);



module.exports = router;
