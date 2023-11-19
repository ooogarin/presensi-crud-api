var express = require('express');
var router = express.Router();
const controller = require('../controller/index');
const validationRules = require('../config/validation/index');
const authLogin = require('../config/middlewares/isLogin');


// GET - all
router.get('/',
    authLogin,
controller.cuti_request.getAll);

// GET - detil by id
router.get('/:id',
    authLogin,
    validationRules.cuti_request.findId,
controller.cuti_request.getDetilCuti);

// POST - create cuti
router.post('/',
    authLogin,
    validationRules.cuti_request.insertData,
controller.cuti_request.insertData);

// DELETE - by id
router.delete('/:id',
    authLogin,
    validationRules.cuti_request.findId,
controller.cuti_request.delete);

// PUT - response cuti
router.put('/:id',
    authLogin,
    validationRules.cuti_request.responseCuti,
controller.cuti_request.update);



module.exports = router;
