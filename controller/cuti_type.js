// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { cuti_type } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};


// get all
controller.getAll = async function(req, res) {
    try {
        await cuti_type.findAll({
            attributes: ['id_cuti_type', 'type_sname', 'type_lname', 'type_description', 'total_cuti', 'datetime_created', 'datetime_edited']
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

                console.log("Data tidak ditemukan");
            } else {
                res.status(200).json({
                    "response": data,
                    "metaData": {
                        "message": "Success",
                        "code": 200,
                        "response_code": "200"
                    }
                });

                console.log(`Berhasil menampilkan data. Jumlah data: ${data.length}`);
            }
        })
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// insert - create role
controller.insertData = async function(req, res) {
    const dataInsert = req.body;
    const resultErrors = validationResult(req);

    // input data
    const data = {
        id_cuti_type: uuidv4(),
        type_sname: dataInsert.type_sname,
        type_lname: dataInsert.type_lname,
        type_description: dataInsert.type_description,
        total_cuti: dataInsert.total_cuti,
        datetime_created: moment().format('YYYY-MM-DD HH:mm:ss'),
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "type_sname": `${data.type_sname}`,
                "type_lname": `${data.type_lname}`,
                "type_description": `${data.type_description}`,
                "total_cuti": `${data.total_cuti}`,
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
        await cuti_type.create(data)
        .then(() => {
            // send response success
            res.status(201).json({
                "response": {
                    "data": [ data ]
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
        await cuti_type.destroy({ where: { id_cuti_type: `${id}` } })
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
        type_sname: dataInsert.type_sname,
        type_lname: dataInsert.type_lname,
        type_description: dataInsert.type_description,
        total_cuti: dataInsert.total_cuti,
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "type_sname": `${data.type_sname}`,
                "type_lname": `${data.type_lname}`,
                "type_description": `${data.type_description}`,
                "total_cuti": `${data.total_cuti}`,
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
        await cuti_type.update(data, { where: { id_cuti_type: `${id}` } })
        .then(([affectedRows, result]) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_cuti_type": `${id}`,
                                "type_sname": `${data.type_sname}`,
                                "type_lname": `${data.type_lname}`,
                                "type_description": `${data.type_description}`,
                                "total_cuti": `${data.total_cuti}`,
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

                console.log(`Berhasil mengubah data. Id: ${data.id_cuti_type}`);
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
