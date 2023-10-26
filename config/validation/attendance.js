const express = require('express');
const bodyParser = require('body-parser');
const { attendance } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
    param('id').custom(async (id) => {
        const data = await attendance.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('id_account').exists().trim().notEmpty().withMessage("id_account tidak sesuai"),
    body('id_schedule').exists().trim().notEmpty().withMessage("id_schedule tidak sesuai"),
    body('event_name').exists().trim().notEmpty().withMessage("event_name tidak sesuai"),
    body('locator_code').exists().trim().notEmpty().withMessage("locator_code tidak sesuai"),
    body('locator_latitude').exists().trim().notEmpty().withMessage("locator_latitude tidak sesuai"),
    body('locator_longitude').exists().trim().notEmpty().withMessage("locator_longitude tidak sesuai"),
    body('selfie').exists().trim().notEmpty().withMessage("selfie tidak sesuai"),
    body('latitude').exists().trim().notEmpty().withMessage("latitude tidak sesuai"),
    body('longitude').exists().trim().notEmpty().withMessage("longitude tidak sesuai"),
    body('reason').exists().trim().notEmpty().withMessage("reason tidak sesuai"),
    body('date_attend').exists().trim().notEmpty().withMessage("date_attend tidak sesuai"),
    // body('datetime_record').exists().trim().notEmpty().withMessage("datetime_record tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai")
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await attendance.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await attendance.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('id_account').exists().trim().notEmpty().withMessage("id_account tidak sesuai"),
    body('id_schedule').exists().trim().notEmpty().withMessage("id_schedule tidak sesuai"),
    body('event_name').exists().trim().notEmpty().withMessage("event_name tidak sesuai"),
    body('locator_code').exists().trim().notEmpty().withMessage("locator_code tidak sesuai"),
    body('locator_latitude').exists().trim().notEmpty().withMessage("locator_latitude tidak sesuai"),
    body('locator_longitude').exists().trim().notEmpty().withMessage("locator_longitude tidak sesuai"),
    body('selfie').exists().trim().notEmpty().withMessage("selfie tidak sesuai"),
    body('latitude').exists().trim().notEmpty().withMessage("latitude tidak sesuai"),
    body('longitude').exists().trim().notEmpty().withMessage("longitude tidak sesuai"),
    body('reason').exists().trim().notEmpty().withMessage("reason tidak sesuai"),
    body('date_attend').exists().trim().notEmpty().withMessage("date_attend tidak sesuai"),
    // body('datetime_record').exists().trim().notEmpty().withMessage("datetime_record tidak sesuai"),
    // body('datetime_created').exists().trim().notEmpty().withMessage("datetime_created tidak sesuai")
];

module.exports = validationRules;
