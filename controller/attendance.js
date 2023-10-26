// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { attendance } = require('../models');
const { validationResult } = require('express-validator');
const dateNow = require('../config/dateNow');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};



// get all
controller.getAll = async function(req, res) {
    try {
        await attendance.findAll()
        .then((result) => {
            // check empty result
            if (result.length == 0) {
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
                    "response": result,
                    "metaData": {
                        "message": "Success",
                        "code": 200,
                        "response_code": "12345"
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
        await attendance.findByPk(id)
        .then((data) => {
            res.status(200).json({
                "response": data,
                "metaData": {
                    "message": "Success",
                    "code": 200,
                    "response_code": "12345"
                }
            });

            console.log(`Berhasil menampilkan data. Id: ${data.id_attendance}`);
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
        id_attendance: uuidv4(),
        id_account: dataInsert.id_account,
        id_schedule: dataInsert.id_schedule,
        event_name: dataInsert.event_name,
        locator_code: dataInsert.locator_code,
        locator_latitude: dataInsert.locator_latitude,
        locator_langitude: dataInsert.locator_langitude,
        selfie: dataInsert.selfie,
        latitude: dataInsert.latitude,
        longitude: dataInsert.longitude,
        reason: dataInsert.reason,
        date_attend: dateNow(),
        datetime_record: dateNow(),
        datetime_created: dateNow()
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_attendance": `${data.id_attendance}`,
                "id_account": `${data.id_account}`,
                "id_schedule": `${data.id_schedule}`,
                "event_name": `${data.event_name}`,
                "locator_code": `${data.locator_code}`,
                "locator_latitude": `${data.locator_latitude}`,
                "locator_langitude": `${data.locator_langitude}`,
                "selfie": `${data.selfie}`,
                "latitude": `${data.latitude}`,
                "longitude": `${data.longitude}`,
                "reason": `${data.reason}`,
                "date_attend": `${data.date_attend}`,
                "datetime_record": `${data.datetime_record}`,
                "datetime_created": `${data.datetime_create}`
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
        await attendance.create(data)
        .then(() => {
            // send response success
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

}

// delete by id
controller.delete = async function(req, res) {
    const id = req.params.id;
    const resultErrors = validationResult(req);

    // invalid/data not found
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
        await attendance.destroy({ where: { id_attendance: `${id}` } })
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
        id_account: dataInsert.id_account,
        id_schedule: dataInsert.id_schedule,
        event_name: dataInsert.event_name,
        locator_code: dataInsert.locator_code,
        locator_latitude: dataInsert.locator_latitude,
        locator_langitude: dataInsert.locator_langitude,
        selfie: dataInsert.selfie,
        latitude: dataInsert.latitude,
        longitude: dataInsert.longitude,
        reason: dataInsert.reason,
        date_attend: dataInsert.date_attend,
        datetime_record: dateNow(),
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_attendance": `${id}`,
                "id_account": `${data.id_account}`,
                "id_schedule": `${data.id_schedule}`,
                "event_name": `${data.event_name}`,
                "locator_code": `${data.locator_code}`,
                "locator_latitude": `${data.locator_latitude}`,
                "locator_langitude": `${data.locator_langitude}`,
                "selfie": `${data.selfie}`,
                "latitude": `${data.latitude}`,
                "longitude": `${data.longitude}`,
                "reason": `${data.reason}`,
                "date_attend": `${data.date_attend}`,
                "datetime_record": `${data.datetime_record}`,
                "datetime_created": `${data.datetime_create}`
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
        await attendance.update(data, { where: { id_attendance: `${id}` } })
        .then(([affectedRows, result]) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_attendance": `${id}`,
                                "id_account": `${data.id_account}`,
                                "id_schedule": `${data.id_schedule}`,
                                "event_name": `${data.event_name}`,
                                "locator_code": `${data.locator_code}`,
                                "locator_latitude": `${data.locator_latitude}`,
                                "locator_langitude": `${data.locator_langitude}`,
                                "selfie": `${data.selfie}`,
                                "latitude": `${data.latitude}`,
                                "longitude": `${data.longitude}`,
                                "reason": `${data.reason}`,
                                "date_attend": `${data.date_attend}`,
                                "datetime_record": `${data.datetime_record}`,
                                // "datetime_created": `${data.datetime_create}`
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
