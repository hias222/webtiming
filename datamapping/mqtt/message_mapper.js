var mqttSender= require('./mqtt_sender');
//this.sendMessage = this.sendMessage.bind

var mqttSender = new mqttSender();

var sendStatus = false;

class MessageMapper {
  constructor() {
    mqttSender.connect();
  }

  // Sends a mqtt message to topic: mytopic
  mapMessage(message) {
    var newmessage = message + ' cleared'
    console.log("datamapping mapper " + newmessage)
    sendStatus = mqttSender.sendMessage(newmessage);
    return newmessage;
  }

  getsendStatus() {
    return sendStatus
  }
}

module.exports = MessageMapper;
