// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { cuti, cuti_type, account, role, Sequelize } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};


// get all
controller.getAll = async function(req, res) {
    try {
        await cuti.findAll({
            attributes: ['id_cuti', 'cuti_start', 'cuti_end', 'status_cuti', 'datetime_created', 'datetime_edited'],
            include: [
                {
                    model: cuti_type,
                    as: 'cuti_type',
                    attributes: ['type_lname']
                },
                {
                    model: account,
                    as: 'account',
                    attributes: ['lname_user'],
                    include: [
                        {
                            model: role,
                            as: 'role',
                            attributes: ['role_sname']
                        }
                    ]
                }
            ]
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

                console.log(`Berhasil menampilkan data. Jumlah data: ${result.length}`);
            }
        })
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// get detil
controller.getDetilCuti = async function(req, res) {
    const id = req.params.id;
    const resultErrors = validationResult(req);

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
        await cuti.findByPk(id, {
            attributes: ['id_cuti', 'cuti_start', 'cuti_end',
                [Sequelize.literal('DATEDIFF(cuti_end, cuti_start)'), 'lama_cuti'],
            'status_cuti', 'cuti_description', 'cuti_response', 'datetime_created', 'datetime_edited'],
            include: [
                {
                    model: cuti_type,
                    as: 'cuti_type',
                    attributes: ['type_lname']
                },
                {
                    model: account,
                    as: 'account',
                    attributes: ['lname_user', 'id_account_level'],
                    include: [
                        {
                            model: role,
                            as: 'role',
                            attributes: ['role_sname']
                        }
                    ]
                },

            ]
        })
        .then((data) => {
            res.status(200).json({
                "response": data,
                "metaData": {
                    "message": "Success",
                    "code": 200,
                    "response_code": "200"
                }
            });

            console.log(`Berhasil menampilkan data. Id: ${data.id_cuti}`);
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }

}

// insert - create cuti
controller.insertData = async function(req, res) {
    const dataInsert = req.body;
    const resultErrors = validationResult(req);

    // input data
    const data = {
        id_cuti: uuidv4(),
        id_account: dataInsert.id_account,
        cuti_start: dataInsert.cuti_start,
        cuti_end: dataInsert.cuti_end,
        id_cuti_type: dataInsert.id_cuti_type,
        cuti_description: dataInsert.cuti_description,
        datetime_created: moment().format('YYYY-MM-DD HH:mm:ss'),
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_cuti": `${data.id_division}`,
                "id_account": `${data.id_account}`,
                "cuti_start": `${data.cuti_start}`,
                "cuti_end": `${data.cuti_end}`,
                "id_cuti_type": `${data.id_cuti_type}`,
                "cuti_description": `${data.cuti_description}`,
                "datetime_created": `${data.datetime_created}`,
                "datetime_edited": `${data.datetime_edited}`,
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
        await cuti.create(data)
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
        await cuti.destroy({ where: { id_cuti: `${id}` } })
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

// update - create response cuti
controller.update = async function(req, res) {
    const id = req.params.id;
    const dataInsert = req.body;
    const resultErrors = validationResult(req);
    
    // input data
    const data = {
        cuti_response: dataInsert.cuti_response,
        status_cuti: dataInsert.status_cuti,
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "cuti_response": `${data.cuti_response}`,
                "status_cuti": `${data.status_cuti}`,
                "datetime_edited": `${data.datetime_edited}`,
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
        await cuti.update(data, { where: { id_cuti: `${id}` } })
        .then(([affectedRows, result]) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_cuti": `${id}`,
                                "cuti_response": `${data.cuti_response}`,
                                "status_cuti": `${data.status_cuti}`,
                                "datetime_edited": `${data.datetime_edited}`,
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
