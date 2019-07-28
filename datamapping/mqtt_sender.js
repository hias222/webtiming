const mqtt = require('mqtt');

class MqttSender {
  constructor() {
    this.mqttClient = null;
    this.mqtttopic = 'mainchannel'
    this.host = 'mqtt://localhost';
    this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
    this.password = 'YOUR_PASSWORD';
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
      console.log(`mqtt sender client connected`);
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt sender client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish(this.mqtttopic, message);
  }
}

module.exports = MqttSender;
