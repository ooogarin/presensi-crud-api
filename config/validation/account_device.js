const express = require('express');
const bodyParser = require('body-parser');
const { account_device } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
    param('id').custom(async (id) => {
        const data = await account_device.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('imei').exists().trim().notEmpty().withMessage("imei tidak sesuai"),
    body('manufacture').exists().trim().notEmpty().withMessage("manufacture tidak sesuai"),
    body('model').exists().trim().notEmpty().withMessage("model tidak sesuai"),
    body('release_vesion').exists().trim().notEmpty().withMessage("release_vesion tidak sesuai"),
    body('sdk_version').exists().trim().notEmpty().withMessage("sdk_version tidak sesuai"),
    body('app_version').exists().trim().notEmpty().withMessage("app_version tidak sesuai"),
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await account_device.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await account_device.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('imei').exists().trim().notEmpty().withMessage("imei tidak sesuai"),
    body('manufacture').exists().trim().notEmpty().withMessage("manufacture tidak sesuai"),
    body('model').exists().trim().notEmpty().withMessage("model tidak sesuai"),
    body('release_vesion').exists().trim().notEmpty().withMessage("release_vesion tidak sesuai"),
    body('sdk_version').exists().trim().notEmpty().withMessage("sdk_version tidak sesuai"),
    body('app_version').exists().trim().notEmpty().withMessage("app_version tidak sesuai"),
];

module.exports = validationRules;
