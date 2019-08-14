var mqttSender = require('./mqtt_sender');
var incoming = require('../incoming/incoming')
var mqttSender = new mqttSender();

var sendStatus = false;
var lastEvent;
var lastHeat;

var lanes = 8;

class MessageMapper {
  constructor() {
    mqttSender.connect();
  }

  // Sends a mqtt message to topic: mytopic
  mapMessage(message) {
    try {
      var newmessage = incoming.parseColoradoData(message)
      try {
        if (newmessage.type === "header") {
          if (newmessage.event != lastEvent || newmessage.heat != lastHeat) {
            lastEvent = newmessage.event
            lastHeat = newmessage.heat
            console.log("Store heat")
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
        console.log("message_mapper wrong old heat")
      }
      var stringnewmessage = JSON.stringify(newmessage)
      console.log("datamapping mapper: " + stringnewmessage)
      sendStatus = mqttSender.sendMessage(stringnewmessage);
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
