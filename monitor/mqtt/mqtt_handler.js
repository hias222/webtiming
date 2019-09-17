const mqtt = require('mqtt');
require('dotenv').config();

var lastMessage = '';
var lastMessages = [];
var ConnectedRaw = false;

var settings = {
  keepalive: 2000
}

function addMessage(message) {
  lastMessage = message
  lastMessages.push(message)
}

class MqttHandler {
  constructor() {
    //super(onMessageChange);
    this.mqttClient = null;
    this.rawtopic =  process.env.SRC_MQTT_RAW_TOPIC;
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
      console.log("mqtt_handler datamapping incoming " + message.toString());
      addMessage(message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt_handler raw client disconnected`);
      SendMessage = messageMapper.mapMessage("connection abort")
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
