import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';


import Header from "./components/header"
//import { runInThisContext } from 'vm';

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
      time: 0
    };
  }

  componentDidMount() {
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
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 0})
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
    const { response } = this.state;
    return (
      <div>
        
        <button onClick={this.handleToggle}>Full</button>
        <Box component="span" m={1}>

          <Header
            lanes={this.state.lanes}
            info={this.state.info}
            time={this.state.time}
          />
          {response
            ? 
              <LinearProgress variant="determinate"/>
          
            : <LinearProgress  />}

        </Box>
      </div>
    );
  }
}
export default App;