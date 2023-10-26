// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { account } = require('../models');
const { validationResult } = require('express-validator');
const dateNow = require('../config/dateNow');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};



// get all
controller.getAll = async function(req, res) {
    try {
        await account.findAll()
        .then((data) => {
            // check empty result
            if (data.length == 0) {
                res.status(201).json({
                    "response": "Data not found",
                    "metaData": {
                        "message": "Success",
                        "code": 201,
                        "response_code": "12345"
                    }
                });

                console.log("Data tidak ditemukan");
            } else {
                res.status(200).json({
                    "response": data,
                    "metaData": {
                        "message": "Success",
                        "code": 200,
                        "response_code": "12345"
                    }
                });

                console.log(`Berhasil menampilkan data. Jumlah data: ${data.length}`);
            }
        })
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// get by id
controller.getById = async function(req, res) {
    const id = req.params.id;
    const resultErrors = validationResult(req);

    // invalid
    if (!resultErrors.isEmpty()) {
        res.json({
            "response": resultErrors,
            "metaData": {
                "message": "Data not found",
                "code": 201,
                "response_code": "12345"
            }
        });

        return;
    }

    try {
        await account.findByPk(id)
        .then((data) => {
            res.status(200).json({
                "response": data,
                "metaData": {
                    "message": "Success",
                    "code": 200,
                    "response_code": "12345"
                }
            });

            console.log(`Berhasil menampilkan data. Id: ${data.id_account}`);
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }

}

// insert
controller.insertData = async function(req, res) {
    const dataInsert = req.body;
    const resultErrors = validationResult(req);

    // input data
    const data = {
        id_account: uuidv4(),
        name_user: dataInsert.name_user,
        mobile: dataInsert.mobile,
        email: dataInsert.email,
        password: dataInsert.password,
        avatar: dataInsert.avatar,
        id_account_level: dataInsert.id_account_level,
        status_account: dataInsert.status_account,
        token: dataInsert.token,
        imei: dataInsert.imei,
        fcm_id: dataInsert.fcm_id,
        last_login: dataInsert.last_login,
        createdAt: dateNow(),
        updatedAt: dateNow()
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_account": uuidv4(),
                "name_user": `${data.name_user}`,
                "mobile": `${data.mobile}`,
                "email": `${data.email}`,
                "password": `${data.password}`,
                "avatar": `${data.avatar}`,
                "id_account_level": `${data.id_account_level}`,
                "status_account": `${data.status_account}`,
                "token": `${data.token}`,
                "imei": `${data.imei}`,
                "fcm_id": `${data.fcm_id}`,
                "last_login": `${data.last_login}`,
                "createdAt": `${data.createdAt}`,
                "updatedAt": `${data.updatedAt}`
            },
            "response": resultErrors,
            "metaData": {
                "message": "Gagal menambahkan data",
                "code": "422",
                "response_code": "12345"
            }
        });

        return;
    }

    // input valid
    try {
        await account.create(data)
        .then(() => {
            res.status(201).json({
                "response": {
                    "data": [
                        data
                    ]
                },
                "metaData": {
                    "message": "Berhasil menambahkan data",
                    "code": "201",
                    "response_code": "12345"
                }
            });
            
            console.log("Berhasil menambahkan data");
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }

};

// delete by id
controller.delete = async function(req, res) {
    const id = req.params.id;
    const resultErrors = validationResult(req);

    // invalid/id not found
    if (!resultErrors.isEmpty()) {
        res.json({
            "response": resultErrors,
            "metaData": {
                "message": "Tidak dapat menghapus data",
                "code": 201,
                "response_code": "12345"
            }
        });

        return;
    }

    try {
        await account.destroy({ where: { id_account: `${id}` } })
        .then((rowsDeleted) => {
            if (rowsDeleted == 1) { // berhasil
                res.status(200).json({
                    "response": [],
                    "metaData": {
                        "message": "Berhasil menghapus data",
                        "code": "200",
                        "response_code": "12345"
                    }
                });

                console.log("Berhasil menghapus data");
            } else { // gagal
                res.status(200).json({
                    "response": [],
                    "metaData": {
                        "message": "Gagal menghapus data",
                        "code": "200",
                        "response_code": "12345"
                    }
                });

                console.log("Gagal menghapus data");
            }
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }

}

// update by id
controller.update = async function(req, res) {
    const id = req.params.id;
    const dataInsert = req.body;
    const resultErrors = validationResult(req);
    
    // input data
    const data = {
        name_user: dataInsert.name_user,
        mobile: dataInsert.mobile,
        email: dataInsert.email,
        password: dataInsert.password,
        avatar: dataInsert.avatar,
        id_account_level: dataInsert.id_account_level,
        status_account: dataInsert.status_account,
        token: dataInsert.token,
        imei: dataInsert.imei,
        fcm_id: dataInsert.fcm_id,
        last_login: dataInsert.last_login,
        updatedAt: dateNow()
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_account": `${id}`,
                "name_user": `${data.name_user}`,
                "mobile": `${data.mobile}`,
                "email": `${data.email}`,
                "password": `${data.password}`,
                "avatar": `${data.avatar}`,
                "id_account_level": `${data.id_account_level}`,
                "status_account": `${data.status_account}`,
                "token": `${data.token}`,
                "imei": `${data.imei}`,
                "fcm_id": `${data.fcm_id}`,
                "last_login": `${data.last_login}`,
                // "createdAt": `${data.createdAt}`,
                "updatedAt": `${data.updatedAt}`
            },
            "response": resultErrors,
            "metaData": {
                "message": "Gagal mengubah data",
                "code": "422",
                "response_code": "12345"
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
                                "mobile": `${data.mobile}`,
                                "email": `${data.email}`,
                                "password": `${data.password}`,
                                "avatar": `${data.avatar}`,
                                "id_account_level": `${data.id_account_level}`,
                                "status_account": `${data.status_account}`,
                                "token": `${data.token}`,
                                "imei": `${data.imei}`,
                                "fcm_id": `${data.fcm_id}`,
                                "last_login": `${data.last_login}`,
                                // "createdAt": `${data.createdAt}`,
                                "updatedAt": `${data.updatedAt}`
                            }
                        ],
                        "result": result
                    },
                    "metaData": {
                        "message": "Berhasil mengubah data",
                        "code": 200,
                        "response_code": "12345"
                    }
                });

                console.log(`Berhasil mengubah data. Id: ${id}`);
            } else { // gagal
                res.status(422).json({
                    "response": "Gagal mengubah data",
                    "metaData": {
                        "message": "Gagal mengubah data",
                        "code": 422,
                        "response_code": "12345"
                    }
                });

                console.log("Gagal mengubah data");
            }
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }

}





module.exports = controller;
