const express = require('express');
const bodyParser = require('body-parser');
const { cuti } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await cuti.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('id_account').exists().trim().notEmpty().withMessage("id_account tidak sesuai"),
    body('cuti_description').exists().trim().notEmpty().withMessage("cuti_description tidak sesuai"),
];

// PUT - create response - update by id
validationRules.responseCuti = [
    param('id').custom(async (id) => {
        const data = await cuti.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('cuti_response').exists().trim().notEmpty().withMessage("cuti_response tidak sesuai"),
    body('status_cuti').exists().trim().notEmpty().withMessage("status_cuti tidak sesuai"),
];

module.exports = validationRules;
