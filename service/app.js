/**
 * @EXPRESS
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/**
 * @MYSQL
 */
var mysql = require('mysql');

var app = express();

/***************************
 LOGIC PART

 /TEST : GET, return test OK string


 ***************************/

//MYSQL TABLE
/**
* @PARKING_DATABASE.SQL
**/
var con = mysql.createConnection({
    host: "203.87.7.66",
    port: "3306",
    user: "twoshot",
    password: "7ujm8ik,",
    database: "parking"
});

app.get('/test', function (req, res) {
    res.send('Hello World!');
});

app.post("/getparkingspaces", function (request, response) {

    var lat = request.body.lat;
    var lng = request.body.lng;
    //The location data is user's current GPS location
    //The server than send back spaces within a lat/lng range.
    console.log('Prepared data');
    con.query('SELECT * from space WHERE spaceLat = \"' +  ""  + '\"', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            response.send(rows);
        }
        else {
            //ERROR
            response.send('ERROR');
        }

    });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
