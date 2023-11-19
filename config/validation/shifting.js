const express = require('express');
const bodyParser = require('body-parser');
const { shifting } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await shifting.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('id_division').exists().trim().notEmpty().withMessage("id_division tidak sesuai"),
    body('id_shift_type').exists().trim().notEmpty().withMessage("id_shift_type tidak sesuai"),
    body('id_shift_turn').exists().trim().notEmpty().withMessage("id_shift_turn tidak sesuai"),
    body('shift_start').exists().trim().notEmpty().withMessage("shift_start tidak sesuai"),
    body('shift_end').exists().trim().notEmpty().withMessage("shift_end tidak sesuai"),
    body('status_shifting').exists().trim().notEmpty().withMessage("status_shifting tidak sesuai"),
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await shifting.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('id_division').exists().trim().notEmpty().withMessage("id_division tidak sesuai"),
    body('id_shift_type').exists().trim().notEmpty().withMessage("id_shift_type tidak sesuai"),
    body('id_shift_turn').exists().trim().notEmpty().withMessage("id_shift_turn tidak sesuai"),
    body('shift_start').exists().trim().notEmpty().withMessage("shift_start tidak sesuai"),
    body('shift_end').exists().trim().notEmpty().withMessage("shift_end tidak sesuai"),
    body('status_shifting').exists().trim().notEmpty().withMessage("status_shifting tidak sesuai"),
];

module.exports = validationRules;
