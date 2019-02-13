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
    //PARKING_DATABASE.SQL used for creating the table, the data source is:
    //https://data.melbourne.vic.gov.au/Transport-Movement/On-street-Parking-Bay-Sensors/vh2v-4nfs
var con = mysql.createConnection({
    host: "manyi.ga", //change to alt server
    port: "3306",
    user: "twoshot",
    password: "7ujm8ik,",
    database: "parking"
});

app.get('/test', function (req, res) {
    res.send('Service Running');
});

app.post("/getparkingspaces", function (request, response) {

    var lat = request.body.lat;
    var lng = request.body.lng;

    //The location data is user's current GPS location
    //The server than send back spaces within a lat/lng range.
    console.log('Prepared data');
    //TODO: The database should fetch realtime data from other parties when at the final stage.
    //TODO: However, in this prototype we return real data but use random status (occupied) to demonstrate.

    //In the final stage, the SQL statement should be like this:
    //WHERE `spaceLat` >= 40.225619  (lat - 0.000010)
    //   AND `spaceLat` <= 40.226561  (lat + 0.000010)
    //   AND `spaceLng` >= -74.223882   (lng - 0.000010)
    //   AND `spaceLng` <= -74.220861;  (lng + 0.000010)
    con.query('SELECT * from space WHERE spaceLat >= ' +  lat - 0.001  + ' AND spaceLat<='+  lat + 0.001  +
        ' AND spaceLng <= ' +  lng - 0.001  + ' AND spaceLng<='+  lng + 0.001, function (err, rows, fields) {
        if (!err) {
            //console.log(rows);
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
