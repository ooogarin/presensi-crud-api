const express = require('express');
const bodyParser = require('body-parser');
const { shift_turn } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
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
    body('status_shift_turn').exists().trim().notEmpty().withMessage("status_shift_turn tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await shift_turn.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
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
    body('status_shift_turn').exists().trim().notEmpty().withMessage("status_shift_turn tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

module.exports = validationRules;
