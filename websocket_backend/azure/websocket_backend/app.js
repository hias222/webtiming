const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");

require('dotenv').config();

var connectionString =  process.env.AZURE_CONNECT_STRING

var { EventHubClient, EventPosition } = require('@azure/event-hubs');

var lanemessages = []

var headermessage = {
  type: 'header',
  competition: 'not defined',
  distance: '50',
  swimstyle: 'FREE',
  event: '0',
  heat: '0'
};

var start = { type: 'start'};
var laststart = Date.now();

var printError = function (err) {
  console.log(err.message);
};

var printMessage = function (message) {
  //console.log('Telemetry received: ');
  //console.log(JSON.stringify(message.body));
  //console.log('Application properties (set by device): ')
  //console.log(JSON.stringify(message.applicationProperties));
  //console.log('System properties (set by IoT Hub): ')
  //console.log(JSON.stringify(message.annotations));
  //console.log('');

  storeBaseData(message.body)

  try {
    io.sockets.emit("FromAPI", JSON.stringify(message.body));
    console.log("websocket backend send " + JSON.stringify(message.body))
  } catch (error) {
    console.error(`websocket backend Error emit : ${error.code}`);
    console.error(error);
  }
};

var ehClient;
EventHubClient.createFromIotHubConnectionString(connectionString).then(function (client) {
  console.log("Successfully created the EventHub Client from iothub connection string.");
  ehClient = client;
  return ehClient.getPartitionIds();
}).then(function (ids) {
  console.log("The partition ids are: ", ids);
  return ids.map(function (id) {
    return ehClient.receive(id, printMessage, printError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  });
}).catch(printError);

const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

io.on("connection", socket => {
  console.log('websocket backend Subscribing to azure');
  //client.subscribe("topic_name");
  sendBaseData()
  socket.on("disconnect", () => console.log("websocket backend Client disconnected"));

  socket.on("error", (error) => {
    console.log(error)
  })
});

server.listen(port, () => console.log(`websocket backend Listening on port ${port}`));


function storeBaseData(message) {
  try {
    var jsonmessage = message
    console.log(jsonmessage.type)
    if (jsonmessage.type == "header") {
      headermessage = jsonmessage
    }

    if (jsonmessage.type == "start") {
      laststart = Date.now()
      start = jsonmessage
    }

    if (jsonmessage.type == "stop") {
      start = jsonmessage
    }

    if (jsonmessage.type == "lane") {
      var lanenumber = (jsonmessage.lane - 1)
      var number_of_elements_to_remove = 1
      lanemessages.splice(lanenumber, number_of_elements_to_remove, jsonmessage);
    }
  } catch (err) {
    console.log(err)
  }

}
function sendBaseData() {
  try {
    io.sockets.emit("FromAPI", JSON.stringify(headermessage));
    
    console.log("init send " + headermessage.toString())
    for (let lane of lanemessages) {
      io.sockets.emit("FromAPI", JSON.stringify(lane));
    }

    var timediff = Date.now() - laststart;
    var jsondiff = "{\"diff\":\"" + timediff + "\" }"
    var newmessage = {...start,...JSON.parse(jsondiff) }
    io.sockets.emit("FromAPI", JSON.stringify(newmessage));
  } catch (error) {
    console.error(`websocket backend Error emit : ${error.code}`);
    console.error(error);
  }

}