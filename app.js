var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var accountRouter = require('./routes/account');
var attendanceRouter = require('./routes/attendance');
var divisionRouter = require('./routes/division');
var scheduleRouter = require('./routes/schedule');
var shiftingRouter = require('./routes/shifting');
var shift_turnRouter = require('./routes/shift_turn');
var shift_typeRouter = require('./routes/shift_type');
var account_levelRouter = require('./routes/account_level');
var account_deviceRouter = require('./routes/account_device');
var locator = require('./routes/locator');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/account', accountRouter);
app.use('/attendance', attendanceRouter);
app.use('/division', divisionRouter);
app.use('/schedule', scheduleRouter);
app.use('/shifting', shiftingRouter);
app.use('/shift_turn', shift_turnRouter);
app.use('/shift_type', shift_typeRouter);
app.use('/account_level', account_levelRouter);
app.use('/account_device', account_deviceRouter);
app.use('/locator', locator);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
