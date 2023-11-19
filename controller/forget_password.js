// controller login
const express = require('express');
const bodyParser = require('body-parser');
const { account } = require('../models');
const { Op } = require('sequelize');
const { Result } = require('express-validator');
require('dotenv').config();

// express
const app = express();
app.use(bodyParser.json());

const controller = {};



controller.forgetPassword = async (req, res) => {
    // input
    const email = req.body.email;
    
    // cek email
    const checkEmail = await account.findOne({ where: { email: email } })
    .then((data) => {
        return data.id_account;
    });

    // email not exist
    if (!checkEmail) {
        return res.send("Email tidak terdaftar");
    }

    const data = { password: req.body.new_password };
    const id = checkEmail;

    // valid email
    await account.update(data, { where: { id_account: `${id}`} })
    .then(([affectedRows]) => {
        if (affectedRows >= 1) { // berhasil
            res.status(200).json({
                "response": {
                    "affectedRows": affectedRows
                },
                "metaData": {
                    "message": "Berhasil mengubah password",
                    "code": 200,
                    "response_code": "200"
                }
            });

            console.log(`Berhasil mengubah password. Id: ${id}`);
        } else { // gagal
            res.status(422).json({
                "response": "Gagal mengubah password",
                "metaData": {
                    "message": "Gagal mengubah password",
                    "code": 422,
                    "response_code": "422"
                }
            });

            console.log("Gagal mengubah password");
        }
    });

}

module.exports = controller;
