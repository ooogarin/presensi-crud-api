// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { locator } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};


// get all
controller.getAll = async function(req, res) {
    try {
        await locator.findAll()
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
        await locator.findByPk(id)
        .then((data) => {
            res.status(200).json({
                "response": data,
                "metaData": {
                    "message": "Success",
                    "code": 200,
                    "response_code": "12345"
                }
            });

            console.log(`Berhasil menampilkan data. Id: ${data.id_locator}`);
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
        id_locator: uuidv4(),
        id_shifting: dataInsert.id_shifting,
        id_schedule: dataInsert.id_schedule,
        locator_code: dataInsert.locator_code,
        latitude: dataInsert.latitude,
        langitude: dataInsert.langitude,
        use_location: dataInsert.use_location,
        status_locator: dataInsert.status_locator,
        datetime_created: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        datetime_edited: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_locator": `${id}`,
                "id_shifting": `${data.id_shifting}`,
                "id_schedule": `${data.id_schedule}`,
                "locator_code": `${data.locator_code}`,
                "latitude": `${data.latitude}`,
                "langitude": `${data.langitude}`,
                "use_location": `${data.use_location}`,
                "status_locator": `${data.status_locator}`,
                "datetime_created": `${data.datetime_created}`,
                "datetime_edited": `${data.datetime_edited}`
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
        await locator.create(data)
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
        await locator.destroy({ where: { id_locator: `${id}` } })
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
        id_shifting: dataInsert.id_shifting,
        id_schedule: dataInsert.id_schedule,
        locator_code: dataInsert.locator_code,
        latitude: dataInsert.latitude,
        langitude: dataInsert.langitude,
        use_location: dataInsert.use_location,
        status_locator: dataInsert.status_locator,
        datetime_edited: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_locator": `${id}`,
                "id_shifting": `${data.id_shifting}`,
                "id_schedule": `${data.id_schedule}`,
                "locator_code": `${data.locator_code}`,
                "latitude": `${data.latitude}`,
                "langitude": `${data.langitude}`,
                "use_location": `${data.use_location}`,
                "status_locator": `${data.status_locator}`,
                "datetime_edited": `${data.datetime_edited}`,
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
        await locator.update(data, { where: { id_locator: `${id}` } })
        .then(([affectedRows, result]) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_locator": `${id}`,
                                "id_shifting": `${data.id_shifting}`,
                                "id_schedule": `${data.id_schedule}`,
                                "locator_code": `${data.locator_code}`,
                                "latitude": `${data.latitude}`,
                                "langitude": `${data.langitude}`,
                                "use_location": `${data.use_location}`,
                                "status_locator": `${data.status_locator}`,
                                "datetime_edited": `${data.datetime_edited}`
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
