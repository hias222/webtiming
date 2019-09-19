var mqttSender = require('./mqtt_sender');
var incoming = require('../incoming/incoming')
var mqttSender = new mqttSender();

var sendStatus = false;
var lastEvent;
var lastHeat;
require('dotenv').config();

//var lanes = 8;
var lanes = typeof process.env.NUMBER_LANES !== "undefined" ? process.env.NUMBER_LANES : 8;

class MessageMapper {
  constructor() {
    mqttSender.connect();
    console.log("<mapper> use " + lanes + " lanes")
  }

  // Sends a mqtt message to topic: mytopic
  mapMessage(message) {
    try {
      var newmessage = incoming.parseColoradoData(message)
      if (newmessage != null) {
        try {
          if (newmessage.type === "header") {
            if (newmessage.event != lastEvent || newmessage.heat != lastHeat) {
              lastEvent = newmessage.event
              lastHeat = newmessage.heat
              console.log("<mapper> Store heat")
              for (var i = 0; i < lanes; i++) {
                //we send all lanes
                var incomingmsg = "lane " + (i + 1);
                var newlanemessage = incoming.parseColoradoData(incomingmsg.toString())
                var stringnewlanemessage = JSON.stringify(newlanemessage)
                mqttSender.sendMessage(stringnewlanemessage);
              }
            }
          }
        } catch (err) {
          console.log(err)
          console.log(" <mapper> message_mapper wrong old heat")
        }
        var stringnewmessage = JSON.stringify(newmessage)

        console.log("<mapper> datamapping mapper: " + stringnewmessage)
        sendStatus = mqttSender.sendMessage(stringnewmessage);
      }
    } catch (err) {
      stringnewmessage = "failed mapping"
    }
    return stringnewmessage;
  }

  getsendStatus() {
    return sendStatus
  }
}

module.exports = MessageMapper;
