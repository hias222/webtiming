var swimEvent = require('../data/swim_event')

//var myEvent = new swimEvent("resources/190706_Export_Meldungen.lef");
var myEvent = new swimEvent("resources/170114-Schwandorf-ME.lef");


exports.parseColoradoData = function (message) {
    var messagetype = getMessageType(message.toString());
    if (messagetype == "header") {
        var internHeatID = myEvent.getInternalHeatId(getEvent(message), getHeat(message));
        //myEvent.getInternalEventID(getEvent(message))
        return JSON.stringify(myEvent.getEventName(getEvent(message)))
    } else if (messagetype == "lane") {
        var newmessage = myEvent.getActualSwimmer(getLaneNumber(message));
        return JSON.stringify(newmessage);
    } else {
        return "unknown"
    }

}

function getMessageType(message) {
    var header = message.startsWith("header"); 
    var lane = message.startsWith("lane"); 
    if (header) {
        return "header"
    } else if (lane) {
        return "lane"
    } else {
        return "unknown"
    }
}

function getHeat(message) {
    var words = message.toString().split(' ');
    //header wk heat
    console.log("HEAT: " + words[2]);
    return words[2]
}

function getEvent(message) {
    var words = message.toString().split(' ');
    //header wk heat
    console.log("Event: " + words[1]);
    return words[1]
}

function getLaneNumber(message) {
    var words = message.toString().split(' ');
    //header wk heat
    console.log("lane: " + words[1]);
    return words[1]
}

module.exports.test = (a, b, callback) => {
    let sum = a + b
    let error = null
    callback(error, sum) // invoke the callback function
}
