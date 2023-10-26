const express = require('express');
const bodyParser = require('body-parser');
const { schedule } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
    param('id').custom(async (id) => {
        const data = await schedule.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('id_account').exists().trim().notEmpty().withMessage("id_account tidak sesuai"),
    body('id_shifting').exists().trim().notEmpty().withMessage("id_shifting tidak sesuai"),
    body('shift_schedule').exists().trim().notEmpty().withMessage("shift_schedule tidak sesuai"),
    body('status_schedule').exists().trim().notEmpty().withMessage("status_schedule tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await schedule.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await schedule.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('id_account').exists().trim().notEmpty().withMessage("id_account tidak sesuai"),
    body('id_shifting').exists().trim().notEmpty().withMessage("id_shifting tidak sesuai"),
    body('shift_schedule').exists().trim().notEmpty().withMessage("shift_schedule tidak sesuai"),
    body('status_schedule').exists().trim().notEmpty().withMessage("status_schedule tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

module.exports = validationRules;
