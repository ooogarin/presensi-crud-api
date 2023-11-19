const express = require('express');
const bodyParser = require('body-parser');
const { division } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await division.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('division_sname').exists().trim().notEmpty().withMessage("division_sname tidak sesuai"),
    body('division_lname').exists().trim().notEmpty().withMessage("division_lname tidak sesuai"),
    body('division_description').exists().trim().notEmpty().withMessage("division_description tidak sesuai"),
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await division.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('division_sname').exists().trim().notEmpty().withMessage("division_sname tidak sesuai"),
    body('division_lname').exists().trim().notEmpty().withMessage("division_lname tidak sesuai"),
    body('division_description').exists().trim().notEmpty().withMessage("division_description tidak sesuai"),
];

module.exports = validationRules;
