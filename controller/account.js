// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { account, role } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};


// get all
controller.getAll = async function(req, res) {
    try {
        await account.findAll({
            attributes: ['id_account', 'lname_user', 'id_account_level', 'mobile', 'email', 'datetime_created', 'status_account'],
            include: [
                {
                    model: role,
                    as: 'role',
                    attributes: ['role_sname']
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

                console.log(`Berhasil menampilkan data. Jumlah data: ${data.length}`);
            }
        })
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// get detil
controller.getDetilAccount = async function(req, res) {
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
        await account.findByPk(id, {
            attributes: ['id_account', 'lname_user', 'id_account_level', 'mobile', 'email', 'password', 'datetime_created', 'status_account', 'avatar', 'datetime_edited'],
            include: [
                {
                    model: role,
                    as: 'role',
                    attributes: ['role_sname']
                }
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
        lname_user: dataInsert.name_user,
        mobile: dataInsert.mobile,
        email: dataInsert.email,
        password: dataInsert.password,
        avatar: dataInsert.avatar,
        id_account_level: dataInsert.id_account_level,
        id_role: dataInsert.id_role, 
        status_account: dataInsert.status_account,
        datetime_created: moment().format('YYYY-MM-DD HH:mm:ss'),
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_account": uuidv4(),
                "lname_user": `${data.name_user}`,
                "mobile": `${data.mobile}`,
                "email": `${data.email}`,
                "password": `${data.password}`,
                "avatar": `${data.avatar}`,
                "id_account_level": `${data.id_account_level}`,
                "id_role": `${data.id_role}`,
                "status_account": `${data.status_account}`,
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
        await account.create(data)
        .then(() => {
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
        res.send(error);
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
        await account.destroy({ where: { id_account: `${id}` } })
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
        lname_user: dataInsert.name_user,
        mobile: dataInsert.mobile,
        email: dataInsert.email,
        password: dataInsert.password,
        avatar: dataInsert.avatar,
        id_account_level: dataInsert.id_account_level,
        id_role: dataInsert.id_role, 
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
                "mobile": `${data.mobile}`,
                "email": `${data.email}`,
                "password": `${data.password}`,
                "avatar": `${data.avatar}`,
                "id_account_level": `${data.id_account_level}`,
                "id_role": `${data.id_role}`,
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
                                "mobile": `${data.mobile}`,
                                "email": `${data.email}`,
                                "password": `${data.password}`,
                                "avatar": `${data.avatar}`,
                                "id_account_level": `${data.id_account_level}`,
                                "id_role": `${data.id_role}`,
                                "status_account": `${data.status_account}`,
                                "last_login": `${data.last_login}`,
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
