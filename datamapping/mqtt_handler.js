const mqtt = require('mqtt');
var mqttSender = require('./mqtt_sender');
var messageMapper = require('./message_mapper')

var messageMapper = new messageMapper();
//var mqttSender = new mqttSender();

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.rawtopic = 'rawdata'
    this.host = 'mqtt://localhost';
    this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
    this.password = 'YOUR_PASSWORD';

    //mqttSender.connect();
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    var settings = {
      keepalive: 2000
    }

    this.mqttClient = mqtt.connect(this.host, settings);

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt raw client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(this.rawtopic, {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log("datamapping incoming " + message.toString());

      messageMapper.mapMessage(message)
      //mqttSender.sendMessage(message + " cleared")
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt raw client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendRawMessage(message) {
    this.mqttClient.publish(this.rawtopic, message);
  }
}

module.exports = MqttHandler;
