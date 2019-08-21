import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Header from "./components/header"
import Static from "./components/static"

//endpoint: "http://127.0.0.1:4001"
//endpoint: "http://" + window.location.hostname + ":4001"
//endpoint: "http://192.168.178.143:4001"

var locklanes = false;
var activelapdata = false;

class App extends Component {
  constructor() {
    var backend_url = process.env.REACT_APP_BACKEND_DIRECT === "true" ? "http://" + window.location.hostname + ":4001" : process.env.REACT_APP_BACKEND_URL
    super();
    this.state = {
      info: { "event": "1", "gender": "M", "relaycount": "1", "swimstyle": "BREAST", "distance": "50", "type": "header", "heat": "1", "competition": "Schwimmen" },
      lanes: [],
      response: false,
      event: 0,
      heat: 0,
      endpoint: backend_url,
      isOn: false,
      time: 0,
      webtype: "",
      fullscreen: false
    };

  }

  componentDidMount() {
    var title_theme = typeof (this.props.match.params.webtype) != 'undefined' ? this.props.match.params.webtype : "normal"
    document.title = "Timing - " + title_theme

    const { webtype } = this.props.match.params
    this.setState(
      { webtype }
    )
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    //console.log("url is %PUBLIC_URL% " + process.env.PUBLIC_URL + window.location.hostname);

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)

    this.laptimer = this.laptimer.bind(this)
    this.clocktimer = this.clocktimer.bind(this)

    this.intervalId = setInterval(this.laptimer, 1000);

    socket.on("FromAPI", data => {
      var jsondata = JSON.parse(data)
      this.checkIncoming(jsondata);
      this.setState({ response: data })
    }
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.timer);
  }

  handleToggle = (e) => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
    this.setState({
      fullscreen: true
    })
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
   // this.timer = setInterval(() => this.setState({
    //  time: Date.now() - this.state.start
    //}), 100);
    // ggf doppelte timer
    if (this.clocktimerid){
      var clocktimeridold = this.clocktimerid
      clearInterval(clocktimeridold)
    }
    this.clocktimerid = setInterval(this.clocktimer, 100);
  }

  stopTimer() {
    this.setState({ isOn: false })
  }

  resetTimer(delay) {
    this.setState({ time: delay })
  }

  clocktimer(){
    if (!this.state.isOn){
      clearInterval(this.clocktimerid)
    }
    this.setState({
      time: Date.now() - this.state.start
    })
  }

  laptimer() {
    if (locklanes) {
      locklanes = false;
    } else {
      if (activelapdata) {
        console.log("active laps")
        var myArray = this.state.lanes;
        activelapdata = false;
        for (let i = 0; i < myArray.length; i++) {
          if (typeof (myArray[i]) !== 'undefined') {
            if (myArray[i].lap === 'true') {
              activelapdata = true;
              if ((Date.now() - myArray[i].laptime) > 12000) {
                if (!locklanes) {
                  var laptime = "{ \"lap\": \"false\", \"place\": \"\", \"time\": \"\" }"
                  var newjsondata = { ...myArray[i], ...JSON.parse(laptime) }
                  var mylane = myArray[i].lane
                  // eslint-disable-next-line
                  this.setState(state => {
                    state.lanes[mylane] = newjsondata
                  })
                } else {
                  console.log("lock happens laps")
                }
              }
            }
          }
        }
      }

    };
  }

  checkIncoming(jsondata) {
    if (jsondata.type === 'lane') {
      locklanes = true;
      if (jsondata.place === '0') {
        var laptime = "{ \"laptime\": \"" + Date.now() + "\",\"lap\": \"true\" }"
        var newjsondata = { ...jsondata, ...JSON.parse(laptime) }
        activelapdata = true;
        this.setState(state => {
          state.lanes[jsondata.lane] = newjsondata
        })
      } else {
        var laptime2 = "{ \"lap\": \"false\" }"
        var newjsondata2 = { ...jsondata, ...JSON.parse(laptime2) }
        this.setState(state => {
          state.lanes[jsondata.lane] = newjsondata2
        })
      }
      console.log("added lane " + jsondata.lane)
    } else if (jsondata.type === 'header') {
      console.log("added header " + jsondata.event + " " + jsondata.heat)

      this.setState({ event: jsondata.event })
      this.setState({ heat: jsondata.heat })
      this.setState(state => {
        state.info = jsondata
      })

      if (jsondata.heat !== this.state.info.heat || jsondata.event !== this.state.info.event) {
        this.setState(state => {
          state.lanes = []
        })
      }
    }


    if (jsondata.type === 'start') {
      console.log("start " + JSON.stringify(jsondata))
      var startdelay = typeof (jsondata.diff) != 'undefined' ? jsondata.diff : "100" 
      console.log("start " + JSON.stringify(jsondata) + " delay " + startdelay)
      this.resetTimer(startdelay)
      this.startTimer();
    }

    if (jsondata.type === 'stop') {
      console.log("stop " + JSON.stringify(jsondata))
      this.resetTimer(0)
      this.stopTimer()
    }
  }


  render() {

    var { fullscreen } = "";
    if (this.state.fullscreen !== true) {
      fullscreen = <button onClick={this.handleToggle}>Full {this.state.webtype}</button>
    }
    var { webcontent } = "";
    if (this.state.webtype === 'static') {
      webcontent = <Static
        lanes={this.state.lanes}
        info={this.state.info}
        time={this.state.time}
        responsestate={this.state.response}
      />
    } else {
      webcontent = <Header
        lanes={this.state.lanes}
        info={this.state.info}
        time={this.state.time}
        responsestate={this.state.response}
      />
    }
    return (
      <div>
        {fullscreen}
        {webcontent}
      </div>
    );
  }
}
export default App;