const express = require('express');
const bodyParser = require('body-parser');
const { role } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await role.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('role_sname').exists().trim().notEmpty().withMessage("role_sname tidak sesuai"),
    body('role_lname').exists().trim().notEmpty().withMessage("role_lname tidak sesuai"),
    body('role_description').exists().trim().notEmpty().withMessage("role_description tidak sesuai"),
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await role.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('role_sname').exists().trim().notEmpty().withMessage("role_sname tidak sesuai"),
    body('role_lname').exists().trim().notEmpty().withMessage("role_lname tidak sesuai"),
    body('role_description').exists().trim().notEmpty().withMessage("role_description tidak sesuai"),
];

module.exports = validationRules;
