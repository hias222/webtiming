import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

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
      if (jsondata.heat != this.state.info.heat || jsondata.event != this.state.info.event ) {
        this.setState(state => {
          state.lanes = []
          state.info = jsondata
        })
      }
    }
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <Header
          lanes={this.state.lanes}
          info={this.state.info}
        />
        {response
          ? <p>
            Connected
          </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;