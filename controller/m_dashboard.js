// controller dashboard
var express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { Sequelize, account, locator, attendance, role, schedule, shifting, division, shift_type, shift_turn } = require('../models');
const { Op, Model, QueryTypes, DATE } = require('sequelize');
const { validationResult, Result } = require('express-validator');
const moment = require('moment');

// express
const app = express();
app.use(bodyParser.json());

const controller = {};



// dashboard mobile
controller.dashboard = async function(req, res) {
    res.json({
        "Profile": await getAccount(req, res),
        "Jadwal saat ini": await getScheduleNow(req, res),
        "Jadwal hari ini": await getScheduleToday(req, res),
    })
}

// get account/profile by login
const getAccount = async function(req, res) {
    // get id_account from token login
    const token = req.headers.authorization.split(" ")[1];
    const id_account = jwt.decode(token).data.id_account;
    
    try {
        const data = await account.findByPk(id_account, {
            attributes: ['lname_user'],
            include: [
                {
                    model: role,
                    as: 'role',
                    attributes: ['role_lname']
                }
            ]
        });

        // return data
        if (data.length === 0) {
            return {
                "response": "Data not found",
                "metaData": {
                    "message": "Success",
                    "code": 404,
                    "response_code": "404"
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

// get active schedule now (by locator)
// - jadwal yang sedang aktif/dapat dilakukan presensi
// - presensi (muncul) dapat dilakukan 1 jam sebelum dan setelah jadwal
const getScheduleNow = async function(req, res) {
    // get id_account from token login
    const token = req.headers.authorization.split(" ")[1];
    const id_account = jwt.decode(token).data.id_account;

    // current date
    const currentDate = moment().format('YYYY-MM-DD');

    try {
        const data = await locator.findAll({
            attributes: ['id_locator', 'locator_code'],
            include: {
                model: schedule,
                as: 'schedule',
                attributes: ['id_schedule', 'shift_schedule'],
                include: [
                    {
                        model: account,
                        as: 'account',
                        attributes: ['lname_user'],
                        where: { id_account: id_account } // by account login
                    },
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
                                attributes: ['turn_sname']
                            },
                            {
                                model: shift_type,
                                as: 'shifting_shift_type',
                                attributes: ['type_lname']
                            }
                        ],
                        where: { // jadwal aktif jam saat ini
                            shift_start: { [Op.lte]: moment().add('minute', 60).format('HH:mm:ss') }, // presensi masuk buka 60 menit sebelum jam masuk
                            shift_end: { [Op.gte]: moment().add('minute', -60).format('HH:mm:ss') } // presensi pulang buka sampai 60 menit setelah jam masuk
                        }
                    }
                ],
                where: {
                    'shift_schedule': currentDate // hari ini
                }
            },
            where: {
                // menampilkan jadwal yang sesuai dengan akun peruntukannya
                '$schedule.account.id_account$': id_account, // by akun login
            }
        });

        // return data
        if (data.length === 0) {
            return {
                "response": "Schedule not found",
                "metaData": {
                    "message": "Success",
                    "code": 404,
                    "response_code": "404"
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


// get schedule today (by locator)
// - jadwal yang ada pada hari ini
const getScheduleToday = async function(req, res) {
    // get id_account from token login
    const token = req.headers.authorization.split(" ")[1];
    const id_account = jwt.decode(token).data.id_account;

    // current date
    const currentDate = moment().format('YYYY-MM-DD');

    try {
        const data = await locator.findAll({
            attributes: ['id_locator', 'locator_code'],
            include: {
                model: schedule,
                as: 'schedule',
                attributes: ['id_schedule', 'shift_schedule'],
                include: [
                    {
                        model: account,
                        as: 'account',
                        attributes: ['lname_user'],
                        where: { id_account: id_account } // by account login
                    },
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
                                attributes: ['turn_sname']
                            },
                            {
                                model: shift_type,
                                as: 'shifting_shift_type',
                                attributes: ['type_lname']
                            }
                        ]
                    }
                ],
                where: {
                    'shift_schedule': currentDate // hari ini
                }
            },
            where: {
                // menampilkan jadwal yang sesuai dengan akun peruntukannya
                '$schedule.account.id_account$': id_account, // by akun login
            }
        });

        // return data
        if (data.length === 0) {
            return {
                "response": "Schedule not found",
                "metaData": {
                    "message": "Success",
                    "code": 404,
                    "response_code": "404"
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



module.exports = controller;
