// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { account_device } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};


// get all
controller.getAll = async function(req, res) {
    try {
        await account_device.findAll()
        .then((result) => {
            // check empty result
            if (result.length == 0) {
                res.status(201).json({
                    "response": "Data not found",
                    "metaData": {
                        "message": "Success",
                        "code": 201,
                        "response_code": "201"
                    }
                });

                console.log("Data tidak ditemukan");
            } else {
                res.status(200).json({
                    "response": result,
                    "metaData": {
                        "message": "Success",
                        "code": 200,
                        "response_code": "200"
                    }
                });

                console.log(`Berhasil menampilkan data. Jumlah data: ${result.length}`);
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
        res.status(201).json({
            "response": resultErrors,
            "metaData": {
                "message": "Data not found",
                "code": 201,
                "response_code": "201"
            }
        });

        return;
    }

    try {
        await account_device.findByPk(id)
        .then((data) => {
            res.status(200).json({
                "response": data,
                "metaData": {
                    "message": "Success",
                    "code": 200,
                    "response_code": "200"
                }
            });

            console.log(`Berhasil menampilkan data. Id: ${data.id_device_account}`);
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
        id_device_account: uuidv4(),
        imei: dataInsert.imei,
        manufacture: dataInsert.manufacture,
        model: dataInsert.model,
        release_version: dataInsert.release_version,
        sdk_version: dataInsert.sdk_version,
        app_version: dataInsert.app_version,
        datetime_created: moment().format('YYYY-MM-DD HH:mm:ss'),
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_device_account": uuidv4(),
                "imei": `${data.imei}`,
                "manufacture": `${data.manufacture}`,
                "model": `${data.model}`,
                "release_version": `${data.release_version}`,
                "sdk_version": `${data.sdk_version}`,
                "app_version": `${data.app_version}`,
                "datetime_created": `${data.datetime_created}`,
                "datetime_edited": `${data.datetime_edited}`
            },
            "response": resultErrors,
            "metaData": {
                "message": "Gagal menambahkan data",
                "code": 422,
                "response_code": "422"
            }
        });

        return;
    }

    // input valid
    try {
        await account_device.create(data)
        .then(() => {
            res.status(201).json({
                "response": {
                    "data": [
                        data
                    ]
                },
                "metaData": {
                    "message": "Berhasil menambahkan data",
                    "code": 201,
                    "response_code": "201"
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
        res.status(201).json({
            "response": resultErrors,
            "metaData": {
                "message": "Tidak dapat menghapus data",
                "code": 201,
                "response_code": "201"
            }
        });

        return;
    }

    try {
        await account_device.destroy({ where: { id_device_account: `${id}` } })
        .then((rowsDeleted) => {
            if (rowsDeleted == 1) { // berhasil
                res.status(200).json({
                    "response": [],
                    "metaData": {
                        "message": "Berhasil menghapus data",
                        "code": 200,
                        "response_code": "200"
                    }
                });

                console.log("Berhasil menghapus data");
            } else { // gagal
                res.status(200).json({
                    "response": [],
                    "metaData": {
                        "message": "Gagal menghapus data",
                        "code": 200,
                        "response_code": "200"
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
        imei: dataInsert.imei,
        manufacture: dataInsert.manufacture,
        model: dataInsert.model,
        release_version: dataInsert.release_version,
        sdk_version: dataInsert.sdk_version,
        app_version: dataInsert.app_version,
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_device_account": `${id}`,
                "imei": `${data.imei}`,
                "manufacture": `${data.manufacture}`,
                "model": `${data.model}`,
                "release_version": `${data.release_version}`,
                "sdk_version": `${data.sdk_version}`,
                "app_version": `${data.app_version}`,
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
        await account_device.update(data, { where: { id_device_account: `${id}` } })
        .then(([affectedRows, result]) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_device_account": `${id}`,
                                "imei": `${data.imei}`,
                                "manufacture": `${data.manufacture}`,
                                "model": `${data.model}`,
                                "release_version": `${data.release_version}`,
                                "sdk_version": `${data.sdk_version}`,
                                "app_version": `${data.app_version}`,
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

                console.log(`Berhasil mengubah data. Id: ${id}`);
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





module.exports = controller;
