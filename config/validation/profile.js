const express = require('express');
const bodyParser = require('body-parser');
const { cuti } = require('../../models');
const { body, param } = require('express-validator');

// express
const app = express();
app.use(bodyParser.json());

const validationRules = {};


// GET - find id
validationRules.findId = [
    param('id').custom(async (id) => {
        const data = await cuti.findByPk(id);
        if (data == null) {
            return Promise.reject("Data not found");
        }
    })
];

// PUT - update data
validationRules.updateById = [
    body('name_user').exists().trim().notEmpty().withMessage("Nama tidak sesuai"),
    body('id_role').exists().trim().notEmpty().isString().withMessage("Role tidak sesuai"),
    body('mobile').exists().trim().notEmpty().isString().withMessage("Nomor telepon tidak sesuai"),
    body('email').exists().trim().notEmpty().isEmail().withMessage("Email tidak sesuai"),
    body('account_level').exists().trim().notEmpty().toInt().isInt({ gt: 0, lt: 7 }).withMessage("Level tidak sesuai dan level hanya dapat diisi angka 1-6"),
    body('avatar').exists().trim().notEmpty().withMessage("Foto tidak sesuai"),
    body('status_account').exists().trim().notEmpty().withMessage("Status akun tidak sesuai")
];

// PUT - change password
validationRules.changePassword = [
    body('new_password').exists().trim().custom((value) => { 
        if (/ /g.test(value)) {
            return Promise.reject("Password tidak boleh mengandung spasi dan minimal 8 karakter");
        }
        return true;
     }).notEmpty().isLength({ min: 8 }).withMessage("Password tidak sesuai")
];

module.exports = validationRules;
