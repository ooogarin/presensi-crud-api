// controller dashboard
var express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, attendance, account, schedule, shifting, division, shift_type, shift_turn } = require('../models');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};

// current date
const currentDate = moment().format('YYYY-MM-DD');

// dashboard
controller.dashboard = async function(req, res) {
    res.json({
        "Presensi hari ini": await getAttendance(req, res),
        "Jadwal hari ini": await getSchedule(req, res),
        "Shift hari ini": await getShifting(req, res),
    })
}

// get attendance
const getAttendance = async function(req, res) {
    try {
        const data = await attendance.findAll({
            attributes: ['date_attend', 'locator_code',
                [Sequelize.literal('MAX(CASE WHEN event_name="START" THEN datetime_record END)'), 'attendance_start'],
                [Sequelize.literal('MAX(CASE WHEN event_name="END" THEN datetime_record END)'), 'attendance_end']
            ],
            group: 'locator_code',
            include: [
                {
                    model: account,
                    as: 'account',
                    attributes: ['lname_user']
                },
                {
                    model: schedule,
                    as: 'schedule',
                    attributes: ['shift_schedule']
                }
            ],
            where: {
                'date_attend': currentDate // hari ini
            },
            limit: 5
        });

        // return data
        if (data.length === 0) {
            return {
                "response": "Data not found",
                "metaData": {
                    "message": "Success",
                    "code": 201,
                    "response_code": "201"
                }
            }
        } else {
            return {
                "Data": data
            }
        }
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// get schedule
const getSchedule = async function(req, res) {
    try {
        const data = await schedule.findAll({
            attributes: ['id_schedule', 'shift_schedule'],
            include: [
                {
                    model: account,
                    as: 'account',
                    attributes: ['lname_user']
                },
                {
                    model: shifting,
                    as: 'shifting',
                    attributes: ['id_shifting'],
                    include: [
                        {
                            model: division,
                            as: 'division',
                            attributes: ['division_sname']
                        },
                        {
                            model: shift_turn,
                            as: 'shifting_shift_turn',
                            attributes: ['turn_lname']
                        },
                        {
                            model: shift_type,
                            as: 'shifting_shift_type',
                            attributes: ['type_sname']
                        }
                    ]
                }
            ],
            where: {
                'shift_schedule': currentDate // hari ini
            },
            limit: 5
        });

        // return data
        if (data.length === 0) {
            return {
                "response": "Data not found",
                "metaData": {
                    "message": "Success",
                    "code": 201,
                    "response_code": "201"
                }
            }
        } else {
            return {
                "Data": data
            }
        }
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// get shifting
const getShifting = async function(req, res) {
    try {
        const data = await schedule.findAll({
            attributes: ['shift_schedule'],
            include: [
                {
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
                            attributes: ['turn_lname']
                        },
                        {
                            model: shift_type,
                            as: 'shifting_shift_type',
                            attributes: ['type_sname']
                        }
                    ]
                }
            ],
            where: {
                'shift_schedule': currentDate // hari ini
            },
            limit: 5
        });

        // return data
        if (data.length === 0) {
            return {
                "response": "Data not found",
                "metaData": {
                    "message": "Success",
                    "code": 201,
                    "response_code": "201"
                }
            }
        } else {
            return {
                "Data": data
            }
        }
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// get keterlambaatan by bulan
// get lembur by bulan
// get cuti by year





module.exports = controller;
