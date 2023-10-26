const express = require('express');
const bodyParser = require('body-parser');
const { shift_type } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
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
    body('status_shift_type').exists().trim().notEmpty().withMessage("status_shift_type tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await shift_type.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
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
    body('status_shift_type').exists().trim().notEmpty().withMessage("status_shift_type tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

module.exports = validationRules;
