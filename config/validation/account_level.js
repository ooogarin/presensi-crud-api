const express = require('express');
const bodyParser = require('body-parser');
const { account_level } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await account_level.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('id_account_level').exists().trim().notEmpty().toInt().isInt({ gt: 0, lt: 7 }).withMessage("Level hanya dapat diisi angka 1-6"),
    body('level_sname').exists().trim().notEmpty().withMessage("level_sname tidak sesuai"),
    body('level_lname').exists().trim().notEmpty().withMessage("level_lname tidak sesuai"),
    body('level_description').exists().trim().notEmpty().withMessage("level_description tidak sesuai"),
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await account_level.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('id_account_level').exists().trim().notEmpty().toInt().isInt({ gt: 0, lt: 7 }).withMessage("Level hanya dapat diisi angka 1-6"),
    body('level_sname').exists().trim().notEmpty().withMessage("level_sname tidak sesuai"),
    body('level_lname').exists().trim().notEmpty().withMessage("level_lname tidak sesuai"),
    body('level_description').exists().trim().notEmpty().withMessage("level_description tidak sesuai"),
];

module.exports = validationRules;
