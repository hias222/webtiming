import React from 'react';
import './App.css';
import Navigation from '../common/Navigation';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import StartIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import SendDatamapping from './datamapping/SendDatamapping';
import RaceModes from './datamapping/RaceModes';
import VideoModes from './datamapping/VideoModes';
import ChangeRaceStatus from './datamapping/ChangeRaceStatus';

import SendMessages from './datamapping/SendMessages';

interface Props {
  message: string;
}

interface State {
  message: string,
  backend: [],
  event: string,
  heat: string,
  lane: string,
  rank: string,
};

export default class admin extends React.Component<Props, State> {
  state: State = {
    message: "start",
    backend: [],
    event: "1",
    heat: "1",
    lane: "1",
    rank: "1"
  };

  public message: string = "";

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? "http://" + window.location.hostname + ":3001/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH


  sendHeader = () => (event: any) => {
    console.log(this.backendConnect + " header " + this.state.event + " " + this.state.heat)

    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "header " + this.state.event + " " + this.state.heat
      })
    })
      .catch(console.log)
    //
  };

  sendLane = () => (event: any) => {
    console.log(this.backendConnect + " lane " + this.state.lane + " 1:11,11 " + this.state.rank)

    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "lane " + this.state.lane + " 1:11,11 " + this.state.rank
      })
    })
      .catch(console.log)
    //
  };

  handleChange = (val: string) => (event: any) => {
    switch (val) {
      case "event":
        this.setState({
          event: event.target.value
        });
        break;
      case "heat":
        this.setState({
          heat: event.target.value
        });
        break;
      case "lane":
        this.setState({
          lane: event.target.value
        });
        break;
      case "rank":
        this.setState({
          rank: event.target.value
        });
        break;
    }
  };


  render() {

    return (
      <div>
        <Navigation />
        <Box component="span" m={1}>
          <RaceModes />
          <br>
          </br>
          <Divider variant="middle" />
          <br>
          </br>
          <VideoModes />
          <br>
          </br>
          <Divider variant="middle" />
          <br>
          </br>
          <SendMessages
            type="standard" />

          <br>
          </br>
          <Divider variant="middle" />
          <br></br>

          <SendDatamapping
            event_type="" />

          <br>
          </br>
          <Divider variant="middle" />
          <br>
          </br>

          <ChangeRaceStatus />
          <br>
          </br>
          <Divider variant="middle" />
          <br>
          </br>


          <Grid item xs={6}>
            <TextField
              id="standard-name"
              label="Wettkampf"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('event')}
            />
            <TextField
              id="standard-name"
              label="Lauf"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('heat')}
            />
          </Grid>

          <Grid>
            <Button variant="contained" color="default" onClick={this.sendHeader()}>Send
            <StartIcon /></Button>
          </Grid>

          <br></br>
          <Divider variant="middle" />
          <br>
          </br>
          <Grid item xs={6}>
            <TextField
              id="standard-name"
              label="Lane"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('lane')}
            />
            <TextField
              id="standard-name"
              label="rank"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('rank')}
            />
          </Grid>

          <Grid>
            <Button variant="contained" color="default" onClick={this.sendLane()}>Send
            <StartIcon /></Button>
          </Grid>


        </Box>

      </div>
    );
  }
}