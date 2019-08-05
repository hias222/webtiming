const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const jmespath = require('jmespath');

var event_all = null
var event_sessions = null;
var event_heatid = null;
var event_swimmer = null;
var event_clubs = null;

var internalheadID = "16005";

class swimevent {

    constructor(filename) {
        this.filename = filename
        this.xml_string = fs.readFileSync(filename, "utf8");
        this.readFile()
    }

    readFile() {
        parser.parseString(this.xml_string, function (error, result) {
            if (error === null) {
                event_all = result;
                event_swimmer = jmespath.search(result.LENEX.MEETS[0].MEET[0], "CLUBS[].CLUB[].ATHLETES[].ATHLETE[]")
                event_clubs = result.LENEX.MEETS[0].MEET[0].CLUBS[0].CLUB
                event_heatid = jmespath.search(result.LENEX.MEETS[0].MEET[0].SESSIONS, "[].SESSION[].EVENTS[].EVENT[]");
                event_sessions = jmespath.search(result.LENEX.MEETS[0].MEET[0].SESSIONS, "[].SESSION[].EVENTS[].EVENT[]")
            }
            else {
                console.log(error);
            }
        });
    }


    getEventName() {
        return event_all.LENEX.MEETS[0].MEET[0].ATTR.name;
    }


    getInternalHeatId(eventnumber, heatnumber) {
        try {
            var searchstring = "[?ATTR.number == '" + eventnumber + "'].HEATS[*].HEAT[*]"
            var tmp_heats = jmespath.search(event_heatid, searchstring)[0][0];
            var searchheat = "[?ATTR.number == '" + heatnumber + "'].ATTR.heatid"
            internalheadID = jmespath.search(tmp_heats, searchheat).toString()
            return internalheadID;
        } catch (err) {
            return new Object();
        }
    }

    getInternalEventID(number) {
        var searchstring = "[?ATTR.number == '" + number + "']"
        var tmp = jmespath.search(event_sessions, searchstring);
        var attributsearch = "[].{event: ATTR.eventid, gender: ATTR.gender, relaycount: SWIMSTYLE[0].ATTR.relaycount, swimstyle: SWIMSTYLE[0].ATTR.stroke, distance: SWIMSTYLE[0].ATTR.distance }"
        return jmespath.search(tmp, attributsearch)[0];
    }

    getActualSwimmer(lane) {
        try {
            var lastswimmers = this.getSwimmerHeat(internalheadID);
            var searchstring = "[?lane == '" + lane + "']"
            var tmp = jmespath.search(lastswimmers, searchstring);
            var swimmer = typeof tmp[0] !== "undefined" ? tmp[0] : new Object();
            if (typeof swimmer.athleteid !== "undefined") {
                var club = this.getSwimmerClub(tmp[0].athleteid)
                return { ...swimmer, ...club[0] };
            } else {
                return swimmer;
            }
        } catch (err) {
            return new Object();
        }

    }

    getSwimmerHeat(internalHeatID) {
        var searchstring = "[?ENTRIES[?ENTRY[?ATTR.heatid == '" + internalHeatID + "']]]"
        var tmp = jmespath.search(event_swimmer, searchstring);
        var searchstring2 = "[].{athleteid: ATTR.athleteid, firstname: ATTR.firstname, lastname: ATTR.lastname, birthdate: ATTR.birthdate , lane: ENTRIES[0].ENTRY[?ATTR.heatid == '" + internalHeatID + "'].ATTR.lane }"
        var tmp2 = jmespath.search(tmp, searchstring2);
        var searchstring3 = "[].{athleteid: athleteid, firstname: firstname, lastname: lastname, lane: lane[0]}"
        return jmespath.search(tmp2, searchstring3);
    }

    getSwimmerClub(swimmerid) {
        var searchstring = "[?ATHLETES[?ATHLETE[?ATTR.athleteid == '" + swimmerid + "']]]"
        var tmp = jmespath.search(event_clubs, searchstring);
        var searchstring2 = "[].{name: ATTR.name, code: ATTR.code}"
        return jmespath.search(tmp, searchstring2);
    }
}

module.exports = swimevent;