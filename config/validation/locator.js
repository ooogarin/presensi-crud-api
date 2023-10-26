const express = require('express');
const bodyParser = require('body-parser');
const { locator } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
    param('id').custom(async (id) => {
        const data = await locator.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('id_shifting').exists().trim().notEmpty().withMessage("id_shifting tidak sesuai"),
    body('id_schedule').exists().trim().notEmpty().withMessage("id_schedule tidak sesuai"),
    body('locator_code').exists().trim().notEmpty().withMessage("locator_code tidak sesuai"),
    body('latitude').exists().trim().notEmpty().withMessage("latitude tidak sesuai"),
    body('longitude').exists().trim().notEmpty().withMessage("longitude tidak sesuai"),
    body('use_location').exists().trim().notEmpty().withMessage("use_location tidak sesuai"),
    body('status_locator').exists().trim().notEmpty().withMessage("status_locator tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await locator.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await locator.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('id_shifting').exists().trim().notEmpty().withMessage("id_shifting tidak sesuai"),
    body('id_schedule').exists().trim().notEmpty().withMessage("id_schedule tidak sesuai"),
    body('locator_code').exists().trim().notEmpty().withMessage("locator_code tidak sesuai"),
    body('latitude').exists().trim().notEmpty().withMessage("latitude tidak sesuai"),
    body('longitude').exists().trim().notEmpty().withMessage("longitude tidak sesuai"),
    body('use_location').exists().trim().notEmpty().withMessage("use_location tidak sesuai"),
    body('status_locator').exists().trim().notEmpty().withMessage("status_locator tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai"),
    // body('datetime_edited').exists().trim().notEmpty().withMessage("datetime_edited tidak sesuai")
];

module.exports = validationRules;
