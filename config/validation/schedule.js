const express = require('express');
const bodyParser = require('body-parser');
const { locator, schedule } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await locator.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('shift_schedule').exists().trim().notEmpty().withMessage("shift_schedule tidak sesuai"),
    body('id_shift_turn').exists().trim().notEmpty().withMessage("id_shift_turn tidak sesuai"),
    body('id_shift_type').exists().trim().notEmpty().withMessage("id_shift_type tidak sesuai"),
    body('id_division').exists().trim().notEmpty().withMessage("id_division tidak sesuai"),
    body('id_account').exists().trim().notEmpty().withMessage("id_account tidak sesuai"),
    body('status_schedule').exists().trim().notEmpty().withMessage("status_schedule tidak sesuai"),
    body('use_location').exists().trim().notEmpty().withMessage("use_location tidak sesuai"),
    body('latitude').exists().trim().notEmpty().withMessage("latitude tidak sesuai"),
    body('longitude').exists().trim().notEmpty().withMessage("longitude tidak sesuai")
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await schedule.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('shift_schedule').exists().trim().notEmpty().withMessage("shift_schedule tidak sesuai"),
    body('id_shift_turn').exists().trim().notEmpty().withMessage("id_shift_turn tidak sesuai"),
    body('id_shift_type').exists().trim().notEmpty().withMessage("id_shift_type tidak sesuai"),
    body('id_division').exists().trim().notEmpty().withMessage("id_division tidak sesuai"),
    body('id_account').exists().trim().notEmpty().withMessage("id_account tidak sesuai"),
    body('status_schedule').exists().trim().notEmpty().withMessage("status_schedule tidak sesuai"),
    body('use_location').exists().trim().notEmpty().withMessage("use_location tidak sesuai"),
    body('latitude').exists().trim().notEmpty().withMessage("latitude tidak sesuai"),
    body('longitude').exists().trim().notEmpty().withMessage("longitude tidak sesuai")
];

// GET - delete by id
validationRules.delete = [
    param('id').custom(async (id) => {
        const data = await schedule.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

module.exports = validationRules;
