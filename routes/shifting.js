var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.shifting.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.shifting.getDataById,
controller.shifting.getById);

// POST
router.post('/',
    authLogin,
    validationRules.shifting.insertData,
controller.shifting.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.shifting.deleteById,
controller.shifting.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.shifting.updateById,
controller.shifting.update);



module.exports = router;
