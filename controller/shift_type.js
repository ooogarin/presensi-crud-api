// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { shift_type } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};


// get all
controller.getAll = async function(req, res) {
    try {
        await shift_type.findAll()
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
        await shift_type.findByPk(id)
        .then((data) => {
            res.status(200).json({
                "response": data,
                "metaData": {
                    "message": "Success",
                    "code": 200,
                    "response_code": "12345"
                }
            });

            console.log(`Berhasil menampilkan data. Id: ${data.id_shift_type}`);
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
        id_shift_type: uuidv4(),
        type_sname: dataInsert.type_sname,
        type_lname: dataInsert.type_lname,
        type_description: dataInsert.type_description,
        status_shift_type: dataInsert.status_shift_type,
        datetime_created: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        datetime_updated: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_shift_type": `${data.id_shift_type}`,
                "type_sname": `${data.type_sname}`,
                "type_lname": `${data.type_lname}`,
                "type_description": `${data.type_description}`,
                "status_shift_type": `${data.status_shift_type}`,
                "datetime_created": `${data.datetime_created}`,
                "datetime_updated": `${data.datetime_updated}`
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
        await shift_type.create(data)
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

    // check empty result
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
        await shift_type.destroy({ where: { id_shift_type: `${id}` } })
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
        type_sname: dataInsert.type_sname,
        type_lname: dataInsert.type_lname,
        type_description: dataInsert.type_description,
        status_shift_type: dataInsert.status_shift_type,
        datetime_updated: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_shift_type": `${id}`,
                "type_sname": `${data.type_sname}`,
                "type_lname": `${data.type_lname}`,
                "type_description": `${data.type_description}`,
                "status_shift_type": `${data.status_shift_type}`,
                "datetime_updated": `${data.datetime_updated}`
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
        await shift_type.update(data, { where: { id_shift_type: `${id}` } })
        .then(([affectedRows, result]) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_shift_type": `${id}`,
                                "type_sname": `${data.type_sname}`,
                                "type_lname": `${data.type_lname}`,
                                "type_description": `${data.type_description}`,
                                "status_shift_type": `${data.status_shift_type}`,
                                "datetime_updated": `${data.datetime_updated}`
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
