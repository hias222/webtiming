const mqtt = require('mqtt');
var mqttSender= require('./mqtt_sender');

var mqttSender = new mqttSender();

class MessageMapper {
  constructor() {
    mqttSender.connect();
  }

  // Sends a mqtt message to topic: mytopic
  mapMessage(message) {
    var newmessage = message + ' cleared'
    console.log("datamapping mapper " + newmessage)
    mqttSender.sendMessage(newmessage)
  }
}

module.exports = MessageMapper;
