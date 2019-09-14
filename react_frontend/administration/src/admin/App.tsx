import React from 'react';
import './App.css';
import Navigation from '../common/Navigation';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import StartIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import ClearIcon from '@material-ui/icons/RestoreFromTrash';
import ClockIcon from '@material-ui/icons/Watch';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

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

  private backendConnect = process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH;

  sendMessage = (message: string) => (event: any) => {
    console.log(this.backendConnect + " " + message + " " + this.state.message)
    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "message " + this.state.message
      })
    })
      .catch(console.log)

  };

  sendAction = (message: string) => (event: any) => {
    console.log(this.backendConnect + " " + message)
    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": message
      })
    })
      .catch(console.log)

  };

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
      case "message":
        this.setState({
          message: event.target.value
        });
        break;
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
          <Grid item xs={6}>
            <Button variant="contained" color="default" onClick={this.sendAction('start')}>
              Start
              <StartIcon />
            </Button>
            <Button variant="contained" color="default" onClick={this.sendAction('stop')}>
              Stop
              <StopIcon />
            </Button>
            <Button variant="contained" color="default" onClick={this.sendAction('clear')}>
              clear
              <ClearIcon />
            </Button>
            <Button variant="contained" color="default" onClick={this.sendAction('clock')}>
              clock
              <ClockIcon />
            </Button>
          </Grid>

          <br>
          </br>
          <Divider variant="middle" />
  

          <Grid>
            <TextField
              id="standard-name"
              label="Message"
              margin="normal"
              onChange={this.handleChange('message')}
            />
          </Grid>
          <Button variant="contained" color="default" onClick={this.sendMessage('message')}>Send
          <StartIcon /></Button>

          <br></br>
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

          <br>
          </br>
          <Divider variant="middle" />
          <br></br>

        </Box>

      </div>
    );
  }
}