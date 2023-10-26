const express = require('express');
const bodyParser = require('body-parser');
const { account } = require('../../models');
const { body, param } = require('express-validator');

const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - get by id
validationRules.getDataById = [
    param('id').custom(async (id) => {
        const data = await account.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// POST - insert data
validationRules.insertData = [
    body('name_user').exists().trim().notEmpty().withMessage("Nama tidak sesuai"),
    body('mobile').exists().trim().notEmpty().isString().withMessage("Nomor telepon tidak sesuai"),
    body('email').exists().trim().notEmpty().isEmail().withMessage("Email tidak sesuai"),
    body('password').exists().trim().custom((value) => { 
        if (/ /g.test(value)) {
            return Promise.reject("Password tidak boleh mengandung spasi dan minimal 8 karakter");
        }
        return true;
     }).notEmpty().isLength({ min: 8 }).withMessage("Password tidak sesuai"),
    body('avatar').exists().trim().notEmpty().withMessage("Avatar tidak sesuai"),
    body('id_account_level').exists().trim().notEmpty().toInt().isInt({ gt: 0, lt: 7 }).withMessage("Level hanya dapat diisi angka 1-7"),
    body('status_account').exists().trim().notEmpty().withMessage("Status akun tidak sesuai"),
    body('token').exists().trim().notEmpty().withMessage("Token tidak sesuai"),
    body('imei').exists().trim().notEmpty().withMessage("IMEI tidak sesuai"),
    body('fcm_id').exists().trim().notEmpty().withMessage("fcm_id tidak sesuai"),
    body('last_login').exists().trim().notEmpty().withMessage("last_login tidak sesuai"),
    // body('createdAt').exists().trim().notEmpty().withMessage("createdAt tidak sesuai"),
    // body('updatedAt').exists().trim().notEmpty().withMessage("updatedAt tidak sesuai")
];

// DELETE - delete by id
validationRules.deleteById = [
    param('id').custom(async (id) => {
        const data = await account.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    })
];

// PUT - update by id
validationRules.updateById = [
    param('id').custom(async (id) => {
        const data = await account.findByPk(id);
        if (data == null) return Promise.reject("Data not found");
    }),
    body('name_user').exists().trim().notEmpty().withMessage("Nama tidak sesuai"),
    body('mobile').exists().trim().notEmpty().isString().withMessage("Nomor telepon tidak sesuai"),
    body('email').exists().trim().notEmpty().isEmail().withMessage("Email tidak sesuai"),
    body('password').exists().trim().custom((value) => { 
        if (/ /g.test(value)) {
            return Promise.reject("Password tidak boleh mengandung spasi dan minimal 8 karakter");
        }
        return true;
     }).notEmpty().isLength({ min: 8 }).withMessage("Password tidak sesuai"),
    body('avatar').exists().trim().notEmpty().withMessage("Avatar tidak sesuai"),
    body('id_account_level').exists().trim().notEmpty().toInt().isInt({ gt: 0, lt: 7 }).withMessage("Level hanya dapat diisi angka 1-7"),
    body('status_account').exists().trim().notEmpty().withMessage("Status akun tidak sesuai"),
    body('token').exists().trim().notEmpty().withMessage("Token tidak sesuai"),
    body('imei').exists().trim().notEmpty().withMessage("IMEI tidak sesuai"),
    body('fcm_id').exists().trim().notEmpty().withMessage("fcm_id tidak sesuai"),
    body('last_login').exists().trim().notEmpty().withMessage("last_login tidak sesuai"),
    // body('createdAt').exists().trim().notEmpty().withMessage("createdAt tidak sesuai"),
    // body('updatedAt').exists().trim().notEmpty().withMessage("updatedAt tidak sesuai")
];

module.exports = validationRules;
