const express = require('express');
const bodyParser = require('body-parser');
const { shift_turn } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await shift_turn.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('turn_sname').exists().trim().notEmpty().withMessage("turn_sname tidak sesuai"),
    body('turn_lname').exists().trim().notEmpty().withMessage("turn_lname tidak sesuai"),
    body('turn_description').exists().trim().notEmpty().withMessage("turn_description tidak sesuai"),
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await shift_turn.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('turn_sname').exists().trim().notEmpty().withMessage("turn_sname tidak sesuai"),
    body('turn_lname').exists().trim().notEmpty().withMessage("turn_lname tidak sesuai"),
    body('turn_description').exists().trim().notEmpty().withMessage("turn_description tidak sesuai"),
];

module.exports = validationRules;
