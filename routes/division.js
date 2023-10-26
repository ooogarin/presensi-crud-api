var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.division.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.division.getDataById,
controller.division.getById);

// POST
router.post('/',
    authLogin,
    validationRules.division.insertData,
controller.division.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.division.deleteById,
controller.division.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.division.updateById,
controller.division.update);



module.exports = router;
