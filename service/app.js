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
    var offset = request.body.offset;
    var decimaldegree = 0.00000001;
    //The location data is user's current GPS location
    //The server than send back spaces within a lat/lng range.
    console.log('Prepared data');
    //TODO: The database should fetch realtime data from other parties when at the final stage.
    //TODO: However, in this prototype we return real data but use random status (occupied) to demonstrate.

    // A value in decimal degrees to a precision of 4 decimal places is precise to 11.132 meters at the equator. A value
    // in decimal degrees to 5 decimal places is precise to 1.1132 meter at the equator.
    switch (offset) {
        case 0:
            decimaldegree = 1; //country or large region  +-111.32 km
            break;
        case 1:
            decimaldegree = 0.1; //large city or district   +-11.132 km
            break;
        case 2:
            decimaldegree = 0.01; //town or village +-1.1132 km
            break;
        case 3:
            decimaldegree = 0.001; //neighborhood, street +-111.32 m
            break;
        /////////////////////////////////////////////////////////////////////////
            //WE DONT REALLY NEED THESE BELOW
        /////////////////////////////////////////////////////////////////////////
        case 4:
            decimaldegree = 0.0001; //individual street, land parcel +-	11.132 m
            break;
        case 5:
            decimaldegree = 0.00001; //individual trees, door entrance +-1.1132 m
            break;
        case 6:
            decimaldegree = 0.000001; //individual humans +-111.32 mm
            break;
        case 7:
            decimaldegree = 0.0000001; //practical limit of commercial surveying +-11.132 mm
            break;
        case 8:
            decimaldegree = 0.00000001; //specialized surveying (e.g. tectonic plate mapping) +-1.1132 mm
            break;
    }

    con.query('SELECT * from space WHERE spaceLat >= ' + lat - decimaldegree + ' AND spaceLat<=' + lat + decimaldegree +
        ' AND spaceLng <= ' + lng - decimaldegree + ' AND spaceLng<=' + lng + decimaldegree, function (err, rows, fields) {
        if (!err) {
            //console.log(rows);
            response.send(rows);
        } else {
            //ERROR
            response.send('ERROR');
        }

    });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
