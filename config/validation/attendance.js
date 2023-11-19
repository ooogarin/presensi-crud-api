const express = require('express');
const bodyParser = require('body-parser');
const { attendance } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find Id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await attendance.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('locator_latitude').exists().trim().notEmpty().withMessage("locator_latitude tidak sesuai"),
    body('locator_longitude').exists().trim().notEmpty().withMessage("locator_longitude tidak sesuai"),
    body('selfie').exists().trim().notEmpty().withMessage("selfie tidak sesuai"),
    body('latitude').exists().trim().notEmpty().withMessage("latitude tidak sesuai"),
    body('longitude').exists().trim().notEmpty().withMessage("longitude tidak sesuai"),
    body('reason').exists().trim().notEmpty().withMessage("reason tidak sesuai")
];



module.exports = validationRules;
