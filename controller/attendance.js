// controller personil
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { attendance, account, schedule, shifting, division, shift_turn, shift_type } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};



// get all
controller.getAll = async function(req, res) {
    try {
        await attendance.findAll({
            attributes: ['id_attendance', 'locator_code', 'date_attend', 'datetime_record', 'event_name'],
            include: [
                {
                    model: account,
                    as: 'account',
                    attributes: ['lname_user']
                },
                {
                    model: schedule,
                    as: 'schedule',
                    attributes: ['id_schedule'],
                    include: {
                        model: shifting,
                        as: 'shifting',
                        attributes: ['id_shifting', 'shift_start', 'shift_end'],
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
                            },
                            {
                                model: shift_type,
                                as: 'shifting_shift_type',
                                attributes: ['type_sname']
                            }
                        ]
                    }
                },
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
controller.getDetilAttendance = async function(req, res) {
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
        await attendance.findByPk(id, {
            attributes: ['id_attendance', 'locator_code', 'date_attend', 'datetime_record', 'event_name', 'status_attendance', 'reason', 'latitude', 'longitude', 'selfie'],
            include: [
                {
                    model: account,
                    as: 'account',
                    attributes: ['lname_user']
                },
                {
                    model: schedule,
                    as: 'schedule',
                    attributes: ['id_schedule'],
                    include: {
                        model: shifting,
                        as: 'shifting',
                        attributes: ['id_shifting', 'shift_start', 'shift_end'],
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
                            },
                            {
                                model: shift_type,
                                as: 'shifting_shift_type',
                                attributes: ['type_sname']
                            }
                        ]
                    }
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
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}



module.exports = controller;
