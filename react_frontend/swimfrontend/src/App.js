import React, { Component } from 'react';
import './App.scss';
import socketIOClient from "socket.io-client";
import Showmessage from './components/event/message';
import Showvideo from './components/showvideo'
import Event from './components/event/event';


//endpoint: "http://127.0.0.1:4001"
//endpoint: "http://" + window.location.hostname + ":4001"
//endpoint: "http://192.168.178.143:4001"

var locklanes = false;
var activelapdata = false;

class App extends Component {
  constructor() {
    var backend_url = process.env.REACT_APP_BACKEND_DIRECT === "true" ? "http://" + window.location.hostname + ":4001" : process.env.REACT_APP_BACKEND_URL
    var rowsperlane = typeof (process.env.REACT_APP_STATIC_ROWS_PER_LANE) != 'undefined' ? process.env.REACT_APP_STATIC_ROWS_PER_LANE : "1"

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
      fullscreen: false,
      mode: "race",
      unixcompetitiontime: 1568556787000,
      message: "",
      showstartlist: false,
      rowsperlane: rowsperlane
    };

  }

  DisplayModes = {
    VIDEO: "video",
    MESSAGE: "message",
    RACE: "race"
  };

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

  componentDidMount() {
    var title_theme = typeof (this.props.match.params.webtype) != 'undefined' ? this.props.match.params.webtype : "normal"
    document.title = "Timing - " + title_theme

    //let webtype = this.props.match.params
    this.setState({
      webtype: title_theme
    })
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    //console.log("url is %PUBLIC_URL% " + process.env.PUBLIC_URL + window.location.hostname);

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.activatePage = this.activatePage.bind(this)

    this.laptimer = this.laptimer.bind(this)
    this.clocktimer = this.clocktimer.bind(this)

    this.intervalId = setInterval(this.laptimer, 1000);

    socket.on("FromAPI", data => {
      var jsondata = JSON.parse(data)
      this.checkIncoming(jsondata);
      this.setState({ response: true })
    });

    socket.on("disconnect", data => {
      console.log("Disconneted -----------------------------")
      console.log(backend_url)
      this.setState({ response: false })
    })


  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.clocktimerid);
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
    if (this.clocktimerid) {
      var clocktimeridold = this.clocktimerid
      clearInterval(clocktimeridold)
    }
    this.clocktimerid = setInterval(this.clocktimer, 100);
  }

  async stopTimer() {
    clearInterval(this.timer);

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });

    let result = await promise; // wait till the promise resolves (*)
    console.log(result)

    this.resetTimer(0)
    this.setState({
      isOn: false,
      time: 0,
      start: Date.now()
    })
  }

  resetTimer(delay) {
    this.setState({ time: delay })
  }

  clocktimer() {
    if (!this.state.isOn) {
      clearInterval(this.clocktimerid)
    }
    this.setState({
      time: Date.now() - this.state.start
    })
  }

  clearlanes() {
    var myArray = this.state.lanes;
    for (let i = 0; i < myArray.length; i++) {
      if (typeof (myArray[i]) !== 'undefined') {
        var laptime = "{ \"lap\": \"false\", \"place\": \"\", \"time\": \"\" }"
        var newjsondata = { ...myArray[i], ...JSON.parse(laptime) }
        var mylane = myArray[i].lane
        // eslint-disable-next-line
        this.setState(state => {
          state.lanes[mylane] = newjsondata
        })
      }
    }
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
              if ((Date.now() - myArray[i].laptime) > 15000) {
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

  activatePage() {
    this.setState({ event: this.state.info.event })
    this.setState({ heat: this.state.info.heat })
    console.log("activePage " + this.state.info.event + " " + this.state.info.heat)
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
          //state.showstartlist = false
        })
      } else {
        var laptime2 = "{ \"lap\": \"false\" }"
        var newjsondata2 = { ...jsondata, ...JSON.parse(laptime2) }
        this.setState(state => {
          state.lanes[jsondata.lane] = newjsondata2
          //state.showstartlist = false
        })
      }

      if (jsondata.time !== "undefined") {
        this.setState(state => {
          state.showstartlist = false
        })
      }
      
      console.log("added lane " + jsondata.lane)
    } else if (jsondata.type === 'header') {
      console.log("added header " + jsondata.event + " " + jsondata.heat)

      this.setState({ event: jsondata.event })
      this.setState({ heat: jsondata.heat })

      setTimeout(this.activatePage, 500);

      if (jsondata.heat !== this.state.info.heat || jsondata.event !== this.state.info.event) {
        console.log("header clear ")
        this.clearlanes();
        this.setState(state => {
          state.info = jsondata
          state.showstartlist = true
        })
      } else {
        console.log("header no clear " + this.state.info.event + " " + this.state.info.heat)
      }
    } else if (jsondata.type === 'clear') {
      console.log("clear ")
      this.setState(state => {
        state.lanes = []
      })
      this.clearlanes();
    }

    if (jsondata.type === 'startlist') {
      console.log("startlist " + this.state.info.event + " " + this.state.info.heat)
      this.setState(state => {
        state.showstartlist = true
        state.type =  "normal"
      })

      setTimeout(this.activatePage, 500);
    }

    if (jsondata.type === 'race') {
      console.log("startlist")
      this.setState(state => {
        state.showstartlist = false
      })
    }

    if (jsondata.type === 'clock') {
      console.log(JSON.stringify(jsondata))
      this.setState({
        mode: "message",
        type: "clock",
        unixcompetitiontime: jsondata.time
      })
    } else if (jsondata.type === 'message' || jsondata.type === 'lenex') {
      console.log(JSON.stringify(jsondata))
      this.setState({
        mode: "message",
        type: "message",
        unixcompetitiontime: jsondata.time,
        message: jsondata.value
      })
    } else if (jsondata.type === 'video') {
      console.log(JSON.stringify(jsondata))
      this.setState({
        mode: "video",
        type: jsondata.version
      })
    } else {
      this.setState({
        mode: "race",
        type: "normal"
      })
    }


    if (jsondata.type === 'start') {
      console.log("start " + JSON.stringify(jsondata))
      var startdelay = typeof (jsondata.diff) != 'undefined' ? jsondata.diff : "100"
      console.log("start " + JSON.stringify(jsondata) + " delay " + startdelay)
      this.setState(state => {
        state.showstartlist = false
      })
      this.resetTimer(startdelay)
      this.startTimer();
    }

    if (jsondata.type === 'stop') {
      console.log("stop " + JSON.stringify(jsondata))
      //async
      //this.resetTimer(0)
      this.stopTimer()
    }

  }


  render() {
    var { fullscreen } = "";
    if (this.state.fullscreen !== true) {
      fullscreen = <button onClick={this.handleToggle}>Full {this.state.webtype}</button>
    }

    var { webcontent } = "";

    if (Object.values(this.DisplayModes).includes(this.state.mode)) {

      if (this.state.mode === 'race') {
        webcontent = <Event
          fullscreen={this.state.fullscreen}
          webtype={this.state.webtype}
          lanes={this.state.lanes}
          info={this.state.info}
          time={this.state.time}
          showstartlist={this.state.showstartlist}
          responsestate={this.state.response}
          rowsperlane={this.state.rowsperlane}
        />
      }

      if (this.state.mode === 'message') {
        webcontent = <Showmessage
          unixcompetitiontime={this.state.unixcompetitiontime}
          type={this.state.type}
          info={this.state.info}
          webtype={this.state.webtype}
          message={this.state.message}
        />
      }

      if (this.state.mode === 'video') {
        webcontent = <Showvideo
          unixcompetitiontime={this.state.unixcompetitiontime}
          type={this.state.type}
          info={this.state.info}
        />
      }
    } else {
      webcontent = <p>wrong mode</p>
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