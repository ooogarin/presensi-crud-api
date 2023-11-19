const express = require('express');
const bodyParser = require('body-parser');
const { shift_type } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await shift_type.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('type_sname').exists().trim().notEmpty().withMessage("type_sname tidak sesuai"),
    body('type_lname').exists().trim().notEmpty().withMessage("type_lname tidak sesuai"),
    body('type_description').exists().trim().notEmpty().withMessage("type_description tidak sesuai"),
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await shift_type.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('type_sname').exists().trim().notEmpty().withMessage("type_sname tidak sesuai"),
    body('type_lname').exists().trim().notEmpty().withMessage("type_lname tidak sesuai"),
    body('type_description').exists().trim().notEmpty().withMessage("type_description tidak sesuai"),
];

module.exports = validationRules;
