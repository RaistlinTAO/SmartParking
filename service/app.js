/**
 * @EXPRESS
 */
var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
//var multer = require('multer');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const requestX = require('request');
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(multer());
app.use('/', indexRouter);
app.use('/users', usersRouter);


/**
 * @MYSQL
 */

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
/***************************
 LOGIC PART
 /TEST : GET, return test OK string
 ***************************/
//Bypass CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.get('/test', function (req, res, next) {
    res.send('Service Running');
    next();
});

app.post('/', function (req, res, next) {
    res.send('POST request');
    next();
});

app.post("/submitparking", function (request, response, next) {
    console.log('Activated Post Function /submitparking');
    //console.log(request.query);
    //console.log(request.query.address );
    if (request.query.address) {
        let address = request.query.address;
        let suburb = request.query.suburb;
        let state = request.query.state;
        let spaces = request.query.spaces;
        let phone = request.query.phone;
        let price = request.query.price;

        let fulladdress = address + ', ' + suburb + ', ' + state;
        console.log(fulladdress);
        //http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=f9QlBHyJnXIlCQo7GKFz&app_code=7LtiUGwdXGzAumIsjyQASw&query=Pariser+1+Berl&beginHighlight=<b>&endHighlight=</b>
        //http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=f9QlBHyJnXIlCQo7GKFz&app_code=7LtiUGwdXGzAumIsjyQASw&country=AUS&query=fulladdress
        console.log('https://geocoder.api.here.com/6.2/geocode.json?app_id=f9QlBHyJnXIlCQo7GKFz&app_code=7LtiUGwdXGzAumIsjyQASw&searchtext=' + encodeURIComponent(fulladdress));
        requestX('https://geocoder.api.here.com/6.2/geocode.json?app_id=f9QlBHyJnXIlCQo7GKFz&app_code=7LtiUGwdXGzAumIsjyQASw&searchtext=' + encodeURIComponent(fulladdress), (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            var obj = JSON.parse(body);
            console.log(obj.Response.View[0].Result[0].Location.DisplayPosition);

            let sqlStatement = 'INSERT INTO space (spaceType, spaceName, spaceAddress, spacePhone, spaceLat, spaceLng, spacePrice) ' +
                'VALUES (2, "Private List Parking", "' + fulladdress + '", ' + phone + ', ' + obj.Response.View[0].Result[0].Location.DisplayPosition.Latitude +
                ' , ' + obj.Response.View[0].Result[0].Location.DisplayPosition.Longitude + ',' + price + ');';

            console.log(sqlStatement);

            con.query(sqlStatement, (err, rows, fields) => {
                console.log(rows);
                if (err) {
                    response.status(404).send(" Something went wrong");
                    // res.sendStatus(500);
                    throw err;
                }
                console.log('OK');
                response.send('OJBK');

            });

        });

        //next();
    }
    //next();
});

app.post("/getparkingspaces", function (request, response, next) {
    console.log('Activated Post Function /getparkingspaces');
    console.log(request.query);
    if (request.query.lat) {
        let lat = request.query.lat;
        let lng = request.query.lng;
        let offset = request.query.offset;
        console.log("post lat = " + lat);
        console.log("post lng = " + lng);
        console.log("post offset = " + offset);
        let decimaldegree = 0.00000001;
        //The location data is user's current GPS location
        //The server than send back spaces within a lat/lng range.
        console.log('Prepared data');
        //TODO: The database should fetch realtime data from other parties when at the final stage.
        //TODO: However, in this prototype we return real data but use random status (occupied) to demonstrate.

        // A value in decimal degrees to a precision of 4 decimal places is precise to 11.132 meters at the equator. A value
        // in decimal degrees to 5 decimal places is precise to 1.1132 meter at the equator.
        switch (offset) {
            case '0':
                decimaldegree = 1; //country or large region  +-111.32 km
                break;
            case '1':
                decimaldegree = 0.1; //large city or district   +-11.132 km
                break;
            case '2':
                decimaldegree = 0.01; //town or village +-1.1132 km
                break;
            case '3':
                decimaldegree = 0.008;
                break;
            case '4':
                decimaldegree = 0.006;
                break;
            case '5':
                decimaldegree = 0.004;
                break;
            case '6':
                decimaldegree = 0.002;
                break;
            case '7':
                decimaldegree = 0.001;
                break;

        }
        console.log('Access Database, decimaldegree = ' + decimaldegree);
        let sqlStatement = 'SELECT * from space WHERE spaceLat >= ' + ((parseFloat(lat) - decimaldegree).toFixed(8)) + ' AND spaceLat<=' + ((parseFloat(lat) + decimaldegree).toFixed(8)) +
            ' AND spaceLng >= ' + ((parseFloat(lng) - decimaldegree).toFixed(8)) + ' AND spaceLng<=' + ((parseFloat(lng) + decimaldegree).toFixed(8));
        console.log(sqlStatement);
        con.query(sqlStatement, (err, rows, fields) => {
            console.log(rows);
            if (err) {
                response.status(404).send(" Something went wrong");
                // res.sendStatus(500);
                throw err;
            }
            console.log('Ready');
            response.send(JSON.stringify(rows));

        });
        //next();
    }
    //next();
});

module.exports = app;