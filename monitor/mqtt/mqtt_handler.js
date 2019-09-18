const mqtt = require('mqtt');
require('dotenv').config();

var lastMessage = '';
var lastMessages = [];
var ConnectedRaw = false;

var settings = {
  keepalive: 2000
}

function addMessage(message, type) {
  lastMessage = message
  var messagedate = Date.now();

  var newmessage = "{ \"date\": \""+ messagedate + " \", \
              \"type\": \""+ type + " \", \
              \"message\": \"" + message + "\" }"
  buildMessages(newmessage)
}

function buildMessages(newmessage) {
  if (lastMessages.length > process.env.MQTT_NUMBER_MESSAGES ) {
    lastMessages.shift();
  }
  try {
    var jsonmessage = JSON.parse(newmessage)
    lastMessages.push(jsonmessage)
  } catch (Exception) {
    lastMessages.push(JSON.parse("{ \"message\": \"failure in parse\"}"))
  }
}

class MqttHandler {
  constructor(topic) {
    //super(onMessageChange);
    this.mqttClient = null;
    this.rawtopic =  topic;
    this.host = 'mqtt://' + process.env.SRC_MQTT_HOST;
    this.connectToMqtt = this.connectToMqtt.bind(this)
    //autoBind(this);
  }

  connectToMqtt() {
    this.mqttClient = mqtt.connect(this.host, settings);
  }

  connect() {
   
    this.connectToMqtt()
   
    this.mqttClient.on('error', (err) => {
      console.log(err);
      ConnectedRaw = false;
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt_handler raw client connected to ` + this.host + " " + this.rawtopic);
      ConnectedRaw = true;
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(this.rawtopic, { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log("<mqtt_handler> monitor " + message.toString());
      addMessage(message.toString(), topic);
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt_handler raw client disconnected`);
      ConnectedRaw = false;
    });

  }

  getLastMessage() {
    return lastMessage;
  }

  getLastMessages() {
    return lastMessages;
  }

  getStatus() {
    return ConnectedRaw;
  }

}

module.exports = MqttHandler;
