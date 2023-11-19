// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { account } = require('../models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};


// get profile
controller.getProfile = async function(req, res) {
    // get id from token login
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt.decode(token).data.id_account;
    
    try {
        await account.findOne({
            attributes: ['lname_user', 'id_role', 'mobile', 'email', 'id_account_level', 'avatar', 'status_account'],
            where: { id_account: id }
        })
        .then((data) => {
            // check empty result
            if (data.length == 0) {
                res.status(201).json({
                    "response": "Data not found",
                    "metaData": {
                        "message": "Success",
                        "code": 201,
                        "response_code": "201"
                    }
                });
            } else {
                res.status(200).json({
                    "response": data,
                    "metaData": {
                        "message": "Success",
                        "code": 200,
                        "response_code": "200"
                    }
                });
            }
        })
    } catch (error) {
        console.error(`Error : ${error}`);
        res.send(error);
    }
}

// update profile
controller.update = async function(req, res) {
    // get id from token login
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt.decode(token).data.id_account;
    
    const dataInsert = req.body;
    const resultErrors = validationResult(req);
    
    // input data
    const data = {
        lname_user: dataInsert.name_user,
        id_role: dataInsert.id_role,
        mobile: dataInsert.mobile,
        email: dataInsert.email,
        id_account_level: dataInsert.account_level,
        avatar: dataInsert.avatar,
        status_account: dataInsert.status_account,
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_account": `${id}`,
                "name_user": `${data.name_user}`,
                "id_role": `${data.id_role}`,
                "mobile": `${data.mobile}`,
                "email": `${data.email}`,
                "account_level": `${data.account_level}`,
                "avatar": `${data.avatar}`,
                "status_account": `${data.status_account}`,
                "datetime_edited": `${data.datetime_edited}`
            },
            "response": resultErrors,
            "metaData": {
                "message": "Gagal mengubah data",
                "code": 422,
                "response_code": "422"
            }
        });

        return;
    }

    // input valid
    try {
        await account.update(data, { where: { id_account: `${id}` } })
        .then(([affectedRows, result]) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_account": `${id}`,
                                "name_user": `${data.name_user}`,
                                "id_role": `${data.id_role}`,
                                "mobile": `${data.mobile}`,
                                "email": `${data.email}`,
                                "account_level": `${data.account_level}`,
                                "avatar": `${data.avatar}`,
                                "status_account": `${data.status_account}`,
                                "datetime_edited": `${data.datetime_edited}`
                            }
                        ],
                        "result": result
                    },
                    "metaData": {
                        "message": "Berhasil mengubah data",
                        "code": 200,
                        "response_code": "200"
                    }
                });
            } else { // gagal
                res.status(422).json({
                    "response": "Gagal mengubah data",
                    "metaData": {
                        "message": "Gagal mengubah data",
                        "code": 422,
                        "response_code": "422"
                    }
                });

                console.log("Gagal mengubah data");
            }
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }

}

// update password
controller.updatePassword = async (req, res) => {
    // get id from token login
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt.decode(token).data.id_account;
    
    try {
        // new password
        const data = { password: req.body.new_password };

        await account.update(data, { where: { id_account: id} })
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
            } else { // gagal
                res.status(422).json({
                    "response": {
                        "affectedRows": affectedRows
                    },
                    "metaData": {
                        "message": "Gagal mengubah password",
                        "code": 422,
                        "response_code": "422"
                    }
                });
            }
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}



module.exports = controller;
