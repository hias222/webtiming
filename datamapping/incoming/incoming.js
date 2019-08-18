var swimEvent = require('../data/swim_event')

var myEvent = new swimEvent("resources/190706_Export_Meldungen.lef");
//var myEvent = new swimEvent("resources/170114-Schwandorf-ME.lef");


exports.parseColoradoData = function (message) {
    var messagetype = getMessageType(message.toString());
    if (messagetype == "header") {
        var internHeatID = myEvent.getInternalHeatId(getEvent(message), getHeat(message));
        return myEvent.getEventName(getEvent(message))
    } else if (messagetype == "lane") {
        var newmessage = myEvent.getActualSwimmer(getLaneNumber(message),getTime(message), getPlace(message));
        return newmessage;
    } else if (messagetype == "start") {
        var jsonstart = "{ \"type\": \"start\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
        return JSON.parse(jsonstart);
    } else {
        return "unknown"
    }

}

function getMessageType(message) {
    var header = message.startsWith("header"); 
    var lane = message.startsWith("lane"); 
    var start = message.startsWith("start");
    if (header) {
        return "header"
    } else if (lane) {
        return "lane"
    } else if (start) {
        return "start"
    } else {
        return "unknown"
    }
}

function getHeat(message) {
    var words = message.toString().split(' ');
    //header wk heat
    console.log("HEAT: " + words[2]);
    try {
        var numberHeat = parseInt(words[2])
        return numberHeat
    } catch (err) {
        console.log(err)
        return 0
    }
}

function getEvent(message) {
    var words = message.toString().split(' ');
    //header wk heat
    console.log("Event: " + words[1]);
    try {
        var numberevent = parseInt(words[1])
        return numberevent
    } catch (err) {
        console.log(err)
        return 0
    }
}

function getLaneNumber(message) {
    var words = message.toString().split(' ');
    //header wk heat
    console.log("(incoming.js)lane: " + words[1]);
    return words[1]
}

function getPlace(message) {
    var words = message.toString().split(' ');
    console.log("(place)lane: " + words[3]);
    return words[3]
}

function getTime(message) {
    var words = message.toString().split(' ');
    //header wk heat
    console.log("(time)lane: " + words[2]);
    return words[2]
}

module.exports.test = (a, b, callback) => {
    let sum = a + b
    let error = null
    callback(error, sum) // invoke the callback function
}
