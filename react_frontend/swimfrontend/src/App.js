import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';


import Header from "./components/header"
//import { runInThisContext } from 'vm';


class App extends Component {
  constructor() {
    super();
    this.state = {
      info: { "event": "1", "gender": "M", "relaycount": "1", "swimstyle": "BREAST", "distance": "50", "type": "header", "heat": "1", "competition": "Schwimmen" },
      lanes: [],
      response: false,
      event: 0,
      heat: 0,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("FromAPI", data => {
      var jsondata = JSON.parse(data)
      this.checkIncoming(jsondata);
      this.setState({ response: data })
      this.setState({ event: jsondata.event })
      this.setState({ heat: jsondata.heat })
      console.log("data in " + jsondata.event)
    }
    );
  }

  checkIncoming(jsondata) {
    if (jsondata.type === 'lane') {
      this.setState(state => {
        state.lanes[jsondata.lane] = jsondata
      })
      console.log("added lane " + jsondata.lane)
    } else if (jsondata.type === 'header') {
      this.setState(state => {
        state.info = jsondata
      })
      if (jsondata.heat !== this.state.info.heat || jsondata.event !== this.state.info.event) {
        this.setState(state => {
          state.lanes = []
        })
      }
    }
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <Box component="span" m={1}>

          <Header
            lanes={this.state.lanes}
            info={this.state.info}
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