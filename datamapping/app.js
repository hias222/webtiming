var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
var mqttRawHandler = require('./mqtt/mqtt_handler');

const path = __dirname + '/views/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//var messageMapper = new messageMapper();
var mqttRawClient = new mqttRawHandler();
mqttRawClient.connect();

// Routes
router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  //res.sendFile(path + 'index.html');
  res.render('start', { 
    title: 'Last Message', 
    status: mqttRawClient.getStatus(),
    message: mqttRawClient.getLastMessage(),
    sendstatus: mqttRawClient.getSendStatus(),
    sendmessage: mqttRawClient.getLastSendMessage()
  });
});


router.post("/send-mqtt", function(req, res) {
  console.log("Message: " +  JSON.stringify(req.body) )
  mqttRawClient.sendRawMessage(req.body.message)
  var lastMessage = mqttRawClient.getLastMessage();
  res.status(200).send("New Message - last " + lastMessage);
});

app.use(express.static(path));
app.use('/', router);
app.set('view engine', 'pug');

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});