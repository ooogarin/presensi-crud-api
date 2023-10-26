const express = require('express');
const bodyParser = require('body-parser');
const { account_level } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
    param('id').custom(async (id) => {
        const data = await account_level.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('id_account_level').exists().trim().notEmpty().toInt().isInt({ gt: 0, lt: 7 }).withMessage("Level hanya dapat diisi angka 1-7"),
    body('level_sname').exists().trim().notEmpty().withMessage("level_sname tidak sesuai"),
    body('level_lname').exists().trim().notEmpty().withMessage("level_lname tidak sesuai"),
    body('level_description').exists().trim().notEmpty().withMessage("level_description tidak sesuai"),
    body('status_account_level').exists().trim().notEmpty().withMessage("status_account_level tidak sesuai"),
    // body('createdAt').exists().trim().notEmpty().withMessage("createdAt tidak sesuai"),
    // body('updatedAt').exists().trim().notEmpty().withMessage("updatedAt tidak sesuai")
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await account_level.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await account_level.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('level_sname').exists().trim().notEmpty().withMessage("level_sname tidak sesuai"),
    body('level_lname').exists().trim().notEmpty().withMessage("level_lname tidak sesuai"),
    body('level_description').exists().trim().notEmpty().withMessage("level_description tidak sesuai"),
    body('status_account_level').exists().trim().notEmpty().withMessage("status_account_level tidak sesuai"),
    // body('createdAt').exists().trim().notEmpty().withMessage("createdAt tidak sesuai"),
    // body('updatedAt').exists().trim().notEmpty().withMessage("updatedAt tidak sesuai")
];

module.exports = validationRules;
