var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.cuti.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.cuti.getDataById,
controller.cuti.getById);

// POST
router.post('/',
    authLogin,
    validationRules.cuti.insertData,
controller.cuti.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.cuti.deleteById,
controller.cuti.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.cuti.updateById,
controller.cuti.update);



module.exports = router;
