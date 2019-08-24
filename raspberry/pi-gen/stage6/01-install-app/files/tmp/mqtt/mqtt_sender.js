const mqtt = require('mqtt');

var sendsuccess = false;

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
      sendsuccess = false;
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt_sender client connected`);
      sendsuccess = true;
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt_sender client disconnected`);
      sendsuccess = false;
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish(this.mqtttopic, message, function (err) {
      if (err) {
        console.log(err)
      }
    })
    return sendsuccess
  }
}

module.exports = MqttSender;
