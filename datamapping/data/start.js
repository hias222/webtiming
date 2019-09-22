var swimEvent = require('./swim_event')

var event = 1;
var heat = 1;

//var myEvent = new swimEvent("resources/190706_Export_Meldungen.lef");
//var myEvent = new swimEvent("resources/170114-Schwandorf-ME.lef");
var myEvent = new swimEvent("resources/test_all.lef");

console.log("Competition Name")
console.log(myEvent.getCompetitionName());

// event description
console.log("Event Name")
console.log(myEvent.getEventName(event));

// Heat Names
console.log("Heat")
var internHeatID = myEvent.getInternalHeatId(event,heat);
//console.log(myEvent.getSwimmerHeat(internHeatID));
console.log(internHeatID);

console.log("ende")

//Club Name Athlet id
//console.log("Club from atheltid")
//console.log(myEvent.getSwimmerClub(91));
