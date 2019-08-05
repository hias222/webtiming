var mqttSender= require('./mqtt_sender');
var incoming = require('../incoming/incoming')
var mqttSender = new mqttSender();


var sendStatus = false;

class MessageMapper {
  constructor() {
    mqttSender.connect();
  }

  // Sends a mqtt message to topic: mytopic
  mapMessage(message) {
    var newmessage = incoming.parseColoradoData(message)
    //var test = incoming.test(1,2,this.getsendStatus)
    console.log("datamapping mapper: " + newmessage)
    sendStatus = mqttSender.sendMessage(newmessage);
    return newmessage;
  }

  getsendStatus() {
    return sendStatus
  }
}

module.exports = MessageMapper;
