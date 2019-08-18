import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Header from "./components/header"
import Static from "./components/static"

//endpoint: "http://127.0.0.1:4001"
//endpoint: "http://" + window.location.hostname + ":4001"
//endpoint: "http://192.168.178.143:4001"

class App extends Component {
  constructor() {

    super();
    this.state = {
      info: { "event": "1", "gender": "M", "relaycount": "1", "swimstyle": "BREAST", "distance": "50", "type": "header", "heat": "1", "competition": "Schwimmen" },
      lanes: [],
      response: false,
      event: 0,
      heat: 0,
      endpoint: "http://192.168.178.143:4001",
      isOn: false,
      time: 0,
      webtype: "static",
      fullscreen: false
    };
  }

  componentDidMount() {
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

    socket.on("FromAPI", data => {
      var jsondata = JSON.parse(data)
      this.checkIncoming(jsondata);
      this.setState({ response: data })
    }
    );
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
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }

  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({ time: 0 })
  }

  checkIncoming(jsondata) {
    if (jsondata.type === 'lane') {
      this.setState(state => {
        state.lanes[jsondata.lane] = jsondata
      })
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
      this.resetTimer()
      this.startTimer();
    }
  }


  render() {
    var { fullscreen } = "";
    if (this.state.fullscreen !== true ) {
      fullscreen = <button onClick={this.handleToggle}>Full {this.state.webtype}</button>
    }
    var { webcontent } = "";
    if (this.state.webtype === 'variable') {
      webcontent = <Header
        lanes={this.state.lanes}
        info={this.state.info}
        time={this.state.time}
        responsestate={this.state.response}
      />
    } else {
      webcontent = <Static
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