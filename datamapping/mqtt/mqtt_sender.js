const mqtt = require('mqtt');
require('dotenv').config()

var sendsuccess = false;

class MqttSender {
  constructor() {
    this.mqttClient = null;
    this.mqtttopic = process.env.DEST_MQTT_TOPIC;
    //this.mqtttopic = 'mainchannel'

    var mqttdestination = typeof process.env.DEST_MQTT_HOST !== "undefined" ? 'mqtt://' + process.env.DEST_MQTT_HOST : 'mqtt://localhost';
    this.authenticationSet = typeof process.env.DEST_MQTT_DEVICEID !== "undefined" ? true : false;
    //this.host = 'mqtt://' + process.env.DEST_MQTT_HOST;
    this.host = mqttdestination;
    this.deviceid = process.env.DEST_MQTT_DEVICEID; // mqtt credentials if these are needed to connect
    this.password = process.env.DEST_MQTT_PWD;
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)

   
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    var settings = {
      keepalive: 2000
    }

    if (this.authenticationSet){
     
      //this.mqttClient = mqtt.connect(this.host, settings);
      var azurehost = "mqtts://" +  process.env.DEST_MQTT_HOST + ":8883"
      var username = process.env.DEST_MQTT_HOST + "/" + process.env.DEST_MQTT_DEVICEID + "/?api-version=2018-06-30"
      console.log("we need auth " + azurehost + " " + username + " " + this.password);


      this.mqttClient = mqtt.connect(azurehost, { 
        clientId: this.deviceid,
        username: username, 
        password: this.password });
      

    } else {
      console.log("no "+ this.authenticationSet + " " + this.username + " " + this.password);
      this.mqttClient = mqtt.connect(this.host, settings);
      console.log("DEST_MQTT_HOST: " +  this.host )
    }
  
    console.log("DEST_MQTT_HOST: " +  this.host )

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
