// controller login
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { account } = require('../models');
const { Op } = require('sequelize');
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
    });

    // check email/username
    if (!checkUsername) {
        return res.send("Username atau password salah");
    }

    // check password
    if (password != checkUsername.password) {
        return res.send("Username atau password salah");
    }

    // create token
    const secretKey = process.env.JWT_SECRET_KEY; // secret key JWT token
    const token = jwt.sign({ username: username }, secretKey, { expiresIn: "5m" });
    
    res.json({
        message: "Login berhasil",
        token: token
    });

}

module.exports = controller;
