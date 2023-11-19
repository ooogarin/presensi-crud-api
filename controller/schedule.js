// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { locator, schedule, account, shifting, shift_turn, shift_type, division } = require('../models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};

// get all from schedule
controller.getAllSchedule = async function(req, res) {
    try {
        await schedule.findAll()
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

// get all
controller.getAll = async function(req, res) {
    try {
        await locator.findAll({
            attributes: ['id_locator', 'locator_code'], // locator jadwal
            include: [
                {
                    model: schedule,
                    as: 'schedule',
                    attributes: ['id_schedule', 'shift_schedule', 'status_schedule'], // tanggal jadwal
                    include: [
                        {
                            model: account,
                            as: 'account',
                            attributes: ['lname_user']
                        },
                        {
                            model: shifting,
                            as: 'shifting',
                            attributes: ['shift_start', 'shift_end'],
                            include: [
                                {
                                    model: division,
                                    as: 'division',
                                    attributes: ['division_sname']
                                },
                                {
                                    model: shift_turn,
                                    as: 'shifting_shift_turn',
                                    attributes: ['turn_sname']
                                }
                            ]
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

                console.log(`Berhasil menampilkan data. Jumlah data: ${data.length}`);
            }
        })
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// get detil
controller.getDetilSchedule = async function(req, res) {
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
        await locator.findByPk(id, {
            attributes: ['id_locator', 'locator_code', 'use_location', 'latitude', 'longitude'], // locator jadwal
            include: [
                {
                    model: schedule,
                    as: 'schedule',
                    attributes: ['id_schedule', 'shift_schedule', 'status_schedule'],
                    include: [
                        {
                            model: account,
                            as: 'account',
                            attributes: ['lname_user']
                        },
                        {
                            model: shifting,
                            as: 'shifting',
                            attributes: ['shift_start', 'shift_end'],
                            include: [
                                {
                                    model: shift_turn,
                                    as: 'shifting_shift_turn',
                                    attributes: ['turn_sname']
                                },
                                {
                                    model: shift_type,
                                    as: 'shifting_shift_type',
                                    attributes: ['type_sname']
                                },
                                {
                                    model: division,
                                    as: 'division',
                                    attributes: ['division_sname']
                                }
                            ]
                        }
                    ]
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
        })
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// insert
controller.insertData = async function(req, res) {
    const dataInsert = req.body;
    const resultErrors = validationResult(req);
    
    // get id_shifting
    const id_shifting = await getIdShifting(dataInsert.id_shift_turn, dataInsert.id_shift_type, dataInsert.id_division); // need validation

    // input data - schedule
    const data = {
        id_schedule: uuidv4(),
        id_locator: uuidv4(),
        shift_schedule: dataInsert.shift_schedule,
        id_shifting: id_shifting,
        id_account: dataInsert.id_account,
        status_schedule: dataInsert.status_schedule,
        datetime_created: moment().format('YYYY-MM-DD HH:mm:ss'),
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_schedule": `${data.id_schedule}`,
                "shift_schedule": `${data.shift_schedule}`,
                "id_shifting": `${data.id_shifting}`,
                "id_account": `${data.id_account}`,
                "status_schedule": `${data.status_schedule}`,
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
        await schedule.create(data)
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

            // create locator
            // pemanggilan setelah pembuatan jadwal --> jadwal+1
            createLocator(req, res, data.id_locator, data.id_schedule, data.id_shifting);
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
        await schedule.destroy({ where: { id_schedule: `${id}` } })
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
    const id_schedule = req.params.id;
    const dataInsert = req.body;
    const resultErrors = validationResult(req);
    
    //get id_shifting
    // const id_shifting = await getIdShifting(dataInsert.id_division, dataInsert.id_shift_turn, dataInsert.id_shift_type);

    // input data
    const data = {
        shift_schedule: dataInsert.shift_schedule,
        id_shifting: dataInsert.id_shifting,
        id_account: dataInsert.id_account,
        status_schedule: dataInsert.status_schedule,
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    // invalid
    if (!resultErrors.isEmpty()) {
        // send response failed
        res.status(422).json({
            "insertValue": {
                "id_schedule": `${id}`,
                "id_account": `${data.id_account}`,
                "id_shifting": `${data.id_shifting}`,
                "shift_schedule": `${data.shift_schedule}`,
                "status_schedule": `${data.status_schedule}`,
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
        await schedule.update(data, { where: { id_schedule: `${id_schedule}` } })
        .then((affectedRows) => {
            if (affectedRows >= 1) { // berhasil
                res.status(200).json({
                    "response": {
                        "data": [
                            {
                                "id_schedule": `${id}`,
                                "shift_schedule": `${data.shift_schedule}`,
                                "status_schedule": `${data.status_schedule}`,
                                "id_account": `${data.id_account}`,
                                "id_shifting": `${data.id_shifting}`,
                                "datetime_edited": `${data.datetime_edited}`
                            }
                        ]
                    },
                    "metaData": {
                        "message": "Berhasil mengubah data",
                        "code": 200,
                        "response_code": "200"
                    }
                });

                console.log(`Berhasil mengubah data. Id: ${id_schedule}`);

                // update locator
                updateLocator(req, res, id_schedule);
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



// ---------- get id_schedule from shifting & division ----------------------------------------
// 1. get shift turn & shift type --> option division
controller.getShifting = async (req, res) => {
    try {
        await shifting.findAll({
            attributes: ['id_shifting'],
            include: [
                {
                    model: shift_turn,
                    as: 'shifting_shift_turn',
                    attributes: ['id_shift_turn', 'turn_lname']
                },
                {
                    model: shift_type,
                    as: 'shifting_shift_type',
                    attributes: ['id_shift_type', 'type_lname']
                }
            ]
        })
        .then((data) => {
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
        });
    } catch (error) {
        console.error(`Error : ${error}`);
        res.send(`Error : ${error}`);
    }
};

// 2. get division (by shift_turn & shift_type)
controller.getDivision = async (req, res) => {
    const id_shift_turn =  req.body.id_shift_turn;
    const id_shift_type =  req.body.id_shift_type;
    
    try {
        await shifting.findAll({
            attributes: ['id_shifting'],
            include: {
                model: division,
                as: 'division',
                attributes: ['id_division', 'division_lname']
            },
            where: {
                [Op.and]: [
                    { id_shift_turn: id_shift_turn },
                    { id_shift_type: id_shift_type }
                ]
            }
        })
        .then((data) => {
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
        res.send(`Error : ${error}`);
    }
};

// 3. get id_shifting
const getIdShifting = async (id_shift_turn, id_shift_type, id_division) => {
    const data = await shifting.findOne({
        where: {
            [Op.and]: [
                { id_shift_turn: id_shift_turn },
                { id_shift_type: id_shift_type },
                { id_division: id_division }
            ]
        }
    })

    return data.id_shifting;
};


// ----------------------------------------------------------------------------------------------------
// generate locator_code
const generateLocatorCode = async function(id_shifting) {
    // get shifting --> locator_code
    const data = await shifting.findByPk(id_shifting, {
        include: [
            {
                model: shift_turn,
                as: 'shifting_shift_turn',
                attributes: ['turn_sname'],
            },
            {
                model: shift_type,
                as: 'shifting_shift_type',
                attributes: ['type_sname'],
            },
            {
                model: division,
                as: 'division',
                attributes: ['division_sname'],
            }
        ]
    });

    // get count schedule --> counter locatore_code
    const countSchedule = await schedule.count();

    const turn = data.shifting_shift_turn.turn_sname;
    const type = data.shifting_shift_type.type_sname;
    const divisi = data.division.division_sname;
    const jumlah = String(countSchedule).padStart(5, "0");

    // locator code = division_sname + turn_sname + type_sname + count schedule
    const locator_code = divisi.concat(turn.concat(type.concat(jumlah)));
    
    console.log("locator_code = " + locator_code);

    return locator_code;
};

// create locator
const createLocator = async function(req, res, id_locator, id_schedule, id_shifting) {
    const dataInsert = req.body;

    // input data - locator
    const data = {
        id_locator: id_locator,
        id_schedule: id_schedule, 
        id_shifting: id_shifting,
        locator_code: await generateLocatorCode(id_shifting),
        use_location: dataInsert.use_location,
        latitude: dataInsert.latitude,
        longitude: dataInsert.longitude,
        datetime_created: moment().format('YYYY-MM-DD HH:mm:ss'),
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    
    // input valid
    try {
        await locator.create(data)
        .then(() => {
            console.log("Berhasil menambahkan data locator");
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }
};

// update locator
const updateLocator = async function(req, res, id_schedule) {
    const dataInsert = req.body;

    // input data - locator
    const data = {
        use_location: dataInsert.use_location,
        latitude: dataInsert.latitude,
        longitude: dataInsert.longitude,
        datetime_edited: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    
    // input valid
    try {
        await locator.update(data, { where: { id_schedule: id_schedule } })
        .then(() => {
            console.log("Berhasil mengubah data locator");
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }
};



module.exports = controller;
