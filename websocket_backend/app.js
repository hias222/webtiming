const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const topic_name = "mainchannel"

const mqtt_host = "mqtt://localhost"
//const mqtt_host = "mqtt://mqtt"

var settings = {
  keepalive: 2000
}

var mqtt = require('mqtt')

var client = mqtt.connect(mqtt_host, settings)
//var client = mqtt.connect('mqtt://localhost', settings)


const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

io.on("connection", socket => {
  console.log('websocket backend Subscribing to ' + mqtt_host);
  //client.subscribe("topic_name");
  socket.on("disconnect", () => console.log("websocket backend Client disconnected"));

  socket.on("error", (error) => {
    console.log(error)
  })
});

server.listen(port, () => console.log(`websocket backend Listening on port ${port}`));

client.on('connect', function () {
  console.log("websocket backend connected");
  client.subscribe(topic_name);
});

client.on('message', function (topic, message) {
  console.log('websocket backend' , topic, message.toString());
  try {
    io.sockets.emit("FromAPI", message.toString());
    console.log("websocket backend send " + message.toString())
  } catch (error) {
    console.error(`websocket backend Error emit : ${error.code}`);
    console.error(error);
  }
});