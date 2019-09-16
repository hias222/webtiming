var swimEvent = require('../data/swim_event')

var fs = require('fs');
var unzipper = require('unzipper')

var myEvent = new swimEvent("resources/190706_Export_Meldungen.lef");
//var myEvent = new swimEvent("resources/170114-Schwandorf-ME.lef");

const actions = {
    HEADER: 'header',
    LANE: 'lane',
    START: 'start',
    STOP: 'stop',
    CLOCK: 'clock',
    CLEAR: 'clear',
    MESSAGE: 'message',
    VIDEO: 'video',
    LENEX: 'lenex'
}


exports.parseColoradoData = function (message) {
    var messagetype = getMessageType(message.toString());
    switch (messagetype) {
        case actions.HEADER:
            console.log('Type: ' + messagetype)
            var internHeatID = myEvent.getInternalHeatId(getEvent(message), getHeat(message));
            return myEvent.getEventName(getEvent(message))
            break;
        case actions.LANE:
            var newmessage = myEvent.getActualSwimmer(getLaneNumber(message), getTime(message), getPlace(message));
            return newmessage;
            break;
        case actions.START:
            var jsonstart = "{ \"type\": \"start\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
            return JSON.parse(jsonstart);
            break;
        case actions.STOP:
            var jsonstart = "{ \"type\": \"stop\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
            return JSON.parse(jsonstart);
            break;
        case actions.CLOCK:
            var jsonclock = "{ \"type\": \"clock\", \"size\": \"large\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
            return JSON.parse(jsonclock);
            break;
        case actions.CLEAR:
            var jsonclear = "{ \"type\": \"clear\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
            return JSON.parse(jsonclear);
            break;
        case actions.VIDEO:
            var jsonvideo = "{ \"type\": \"video\", \"version\": \"1\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
            return JSON.parse(jsonvideo);
            break;
        case actions.MESSAGE:
            console.log("mess ")
            var jsonmsg = "{ \"type\": \"message\", \"value\": \"" + getMessage(message) + "\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
            return JSON.parse(jsonmsg);
            break;
        case actions.LENEX:
            var newfilename = getMessage(message)
            console.log("lenex " + newfilename)
            getNewLenexFile(newfilename);
            var jsonlenex = "{ \"type\": \"lenex\", \"value\": \"" + getMessage(message) + "\", \"time\": \"" + Math.floor(new Date() / 1000) + "\" }"
            return JSON.parse(jsonlenex);
            break;
        default:
            console.log('Type:  not declared')
            break;
    }
    return "unknown"
}

async function getNewLenexFile(filename) {
   
    var lenexfile = __dirname + '/../uploads/' + filename;
    var destlenexpath = __dirname + '/../resources';
    var destpath = __dirname + '/../resources/' + filename.split('.').slice(0, -1).join('.') + ".lef"
    var destfilename = 'resources/' + filename.split('.').slice(0, -1).join('.') + ".lef"

    console.log("check " + filename + " dest " + destpath)

    try {

        fs.access(lenexfile, fs.F_OK, (err) => {
            if (err) {
                console.log("not exists " + lenexfile)
                console.error(err);
                return;
            }
            // file exists
            console.log("exist " + lenexfile)

            fs.createReadStream(lenexfile)
                .pipe(unzipper.Extract({ path: destlenexpath }))
                .on('error', (err) => {
                    console.log("error extract " + lenexfile)
                    console.log(err)
                })
                .on('finish', (success) => {
                    console.log("success extract")
                    
                    fs.access(destpath, fs.F_OK, (err) => {
                        if (err) {
                            console.log("not exists " + destpath)
                            console.error(err);
                            return;
                        }
                        // file exists
                        console.log("exist " + destpath)
                        console.log("old " + JSON.stringify(myEvent.getCompetitionName()))
                        myEvent.updateFile(destfilename)
                        console.log("new " + myEvent.filename)
                        console.log("new " + JSON.stringify(myEvent.getCompetitionName()))
                    })
                })
        });
    } catch (Exception) {
        console.log("error extract ")
        console.log(Exception)
    }
}

function getMessageType(message) {
    var newactions = message.replace(/ .*/, '');
    console.log("new message " + newactions)
    if (Object.values(actions).includes(newactions)) {
        return newactions;
    } else {
        return "unknown";
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

function getMessage(message) {
    try {
        var newStr = message.toString().substr(message.indexOf(" ") + 1);
        return newStr
    } catch (err) {
        console.log(err)
        return ""
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
