var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.schedule.getAll);

// GET - by id
router.get('/:id',
    authLogin,
    validationRules.schedule.getDataById,
controller.schedule.getById);

// POST
router.post('/',
    authLogin,
    validationRules.schedule.insertData,
controller.schedule.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.schedule.deleteById,
controller.schedule.delete);

// PUT
router.put('/:id',
    authLogin,
    validationRules.schedule.updateById,
controller.schedule.update);



module.exports = router;
