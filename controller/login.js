// controller login
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { account } = require('../models');
const { Op } = require('sequelize');
const { Result } = require('express-validator');
require('dotenv').config();

// express
const app = express();
app.use(bodyParser.json());

const controller = {};



controller.login = async (req, res) => {
    // input
    const username = req.body.username;
    const password = req.body.password;
    
    // cek login
    const checkUsername = await account.findOne({
        where: {
            [Op.or] : [
                { mobile: `${username}` },
                { email: `${username}` }
            ]
        }
    })
    .then((data) => {
        return data;
    });

    // username not exist OR wrong password
    if (!checkUsername || password != checkUsername.password) {
        return res.send("Username atau password salah");
    }

    // create token
    const secretKey = process.env.JWT_SECRET_KEY; // secret key JWT token
    const data = {
        id_account: checkUsername.id_account,
        account_level: checkUsername.id_account_level
    }
    const token = jwt.sign({ data }, secretKey, { expiresIn: "30m" });
    
    res.status(200).json({
        message: "Login berhasil",
        token: token,
        level: checkUsername.id_account_level,
    });

}

module.exports = controller;
