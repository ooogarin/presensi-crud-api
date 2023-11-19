// cek login - token
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const isLogin = (req, res, next) => {
    return next(); // for debug/testing
    const secretKey = process.env.JWT_SECRET_KEY;
    
    // invalid token
    if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
        return res.send("Invalid token");
    }
    
    // check token
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, secretKey);

        next();
    } catch(err) {
        return res.send("Invalid token");
    }

}

module.exports = isLogin;
