var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
var mqttRawHandler = require('./mqtt/mqtt_handler');

var moment = require('moment')

require('dotenv').config();

const path = __dirname + '/views/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.options('*', cors());

var mqttRawClient = new mqttRawHandler(process.env.SRC_MQTT_RAW_TOPIC);
mqttRawClient.connect();

var mqttErrorClient = new mqttRawHandler(process.env.SRC_MQTT_ERROR_TOPIC);
mqttErrorClient.connect();

var mqttMainClient = new mqttRawHandler(process.env.SRC_MQTT_MAIN_TOPIC);
mqttMainClient.connect();

// Routes
router.use(function (req, res, next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function (req, res) {
  //res.sendFile(path + 'index.html');
  res.render('start', {
    moment: require('moment'),
    status: mqttRawClient.getStatus(),
    message: mqttRawClient.getLastMessage(),
    values: mqttRawClient.getLastMessages(),
  });
});


router.post("/send-mqtt", function (req, res) {
  console.log("Message: " + JSON.stringify(req.body))
  mqttRawClient.sendRawMessage(req.body.message)
  var lastMessage = mqttRawClient.getLastMessage();
  res.status(200).send("New Message - last " + lastMessage);
});

app.use(express.static(path));
app.use('/', router);
app.set('view engine', 'pug');

var HTTP_REST_PORT = typeof process.env.HTTP_REST_PORT !== "undefined" ? process.env.HTTP_REST_PORT : 3001;

var server = app.listen(HTTP_REST_PORT, function () {
  console.log("app running on port.", server.address().port);
});