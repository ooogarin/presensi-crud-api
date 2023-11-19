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



// GET - pre-attendance (konfirmasi presensi)
// informasi sebelum melakukan presensi
const getPreAttendance = async function(req, res) {
    const resultErrors = validationResult(req);

    // get id_account from token login
    const token = req.headers.authorization.split(" ")[1];
    const id_account = jwt.decode(token).data.id_account;
    
    // get locator code
    const locator_code = req.params.id;
    
    // current date
    const currentDate = moment().format('YYYY-MM-DD');

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
                                attributes: ['turn_lname']
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
                locator_code: locator_code,
                // jadwal dapat dilakukan presensi hanya oleh akun yang sesuai peruntukan jadwalnya, yaitu yang login. Sehingga tiap akun hanya dapat melakukan presensi di jadwalnya saja
                '$schedule.account.id_account$': id_account, // by akun login (hanya dapat ditampilkan/dilakukan oleh yang login)
            }
        });

        // return data
        if (data.length === 0) { // false
            return data.length; // tidak ada data, --> tidak ada jadwal atau tidak ada jadwal yang aktif
        } else { // true
            return {
                "response": data,
                "metaData": {
                    "message": "Success",
                    "code": 200,
                    "response_code": "200"
                }
            };
        }

    } catch (error) {
        console.error(`Error : ${error}`);
        res.send(error);
    }
};

// pre-attendance
controller.preAttendance = async function(req, res) {
    if (await getPreAttendance(req, res) === 0) { // tidak ada jadwal atau tidak ada jadwal yang aktif
        res.status(404).json({
            "response": "Schedule not found",
            "metaData": {
                "message": "Success",
                "code": 404,
                "response_code": "404"
            }
        });
    } else { // terdapat jadwal aktif
        res.status(200).json(await getPreAttendance(req, res));
    }
};


// insert attendance
// POST - pre-attendance (reason) --> insert attendance
controller.insertData = async function(req, res) {
    // cek jam presensi atau bukan
    // tidak dapat melakukan presensi, bukan waktu presensi atau tidak ada jadwal yang aktif
    if (await getPreAttendance(req, res) === 0) {
        return res.status(403).json({
            "response": {
                "data": "Not attendance time"
            },
            "metaData": {
                "message": "Bukan waktu presensi",
                "code": 403,
                "response_code": "403"
            }
        });
    } else {
        const dataInsert = req.body;
        const resultErrors = validationResult(req);
    
        // get locator_code
        const locator_code = req.params.id;
    
        // get id_account from token login
        const token = req.headers.authorization.split(" ")[1];
        const id_account = jwt.decode(token).data.id_account;
    
        // get id_schedule
        const id_schedule = await getIdSchedule(locator_code);
    
        // set event (start/end)
        const event = await eventAttendance(locator_code);
    
        // attendance is finished (sudah presensi masuk dan pulang)
        if (event === "FINISHED") {
            return res.status(429).json({
                "response": {
                    "data": "Attendance is finished"
                },
                "metaData": {
                    "message": "Gagal menambahkan data, presensi sudah selesai",
                    "code": 429,
                    "response_code": "429"
                }
            });
        } 
    
        // input data
        const data = {
            id_attendance: uuidv4(),
            id_account: id_account, // from token login
            id_schedule: id_schedule, // from locator code
            event_name: event, // (start/end)
            locator_code: locator_code, // id locator
            locator_latitude: dataInsert.locator_latitude,
            locator_langitude: dataInsert.locator_langitude,
            selfie: dataInsert.selfie,
            latitude: dataInsert.latitude,
            longitude: dataInsert.longitude,
            reason: dataInsert.reason,
            date_attend: moment().format('YYYY-MM-DD'),
            datetime_record: moment().format('YYYY-MM-DD HH:mm:ss'),
            datetime_created: moment().format('YYYY-MM-DD HH:mm:ss')
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
                    "locator_code": `${id}`,
                    "locator_latitude": `${data.locator_latitude}`,
                    "locator_langitude": `${data.locator_langitude}`,
                    "selfie": `${data.selfie}`,
                    "latitude": `${data.latitude}`,
                    "longitude": `${data.longitude}`,
                    "reason": `${data.reason}`,
                    "attendance_start": `${data.attendance_start}`,
                    "date_attend": `${data.date_attend}`,
                    "datetime_record": `${data.datetime_record}`,
                    "datetime_created": `${data.datetime_created}`,
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
            await attendance.create(data)
            .then(() => {
                // send response success
                res.status(201).json({
                    "response": {
                        "data": [ data ]
                    },
                    "metaData": {
                        "message": "Berhasil presensi",
                        "code": 201,
                        "response_code": "201"
                    }
                });
            });
        } catch (error) {
            console.error(`Error : ${error}`);
        }
    }
}





// ----------------------------------------------------------------------------------------------------
// check event attendance (start/end)
const eventAttendance = async (locator_code) => {
    try {
        const data = await attendance.findAll({ where: { locator_code: locator_code } });

        let event = "LOGIN";            

        // set event name
        if (data.length == 0) { // attendance start
            event = "START";
        } else if (data.length == 1) { // attendance end
            event = "END";
        } else {
            event = "FINISHED"; // attendance is finished
        }

        return event;
    } catch (error) {   
        console.error(`Error : ${error}`);
    }
}

// get id_schedule
const getIdSchedule = async (locator_code) => {
    try {
        const data = await locator.findOne({ where: { locator_code: locator_code } });
        return data.id_schedule;
    } catch (error) {   
        console.error(`Error : ${error}`);
    }
}



module.exports = controller;
