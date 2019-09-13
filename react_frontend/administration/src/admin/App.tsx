import React from 'react';
import './App.css';
import Navigation from '../common/Navigation';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import StartIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

interface Props {
  message: string;
}

interface State {
  message: string,
  backend: []
};

export default class admin extends React.Component<Props, State> {
  state: State = {
    message: "start",
    backend: []
  };

  public message: string = "";

  private backendConnect = process.env.REACT_APP_DATAMAPPING_INTERNAL_URL;
  private mqqtSendPath = process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH;

  sendMessage = (message: string) => (event: any) => {
    console.log(this.backendConnect + "/" + this.mqqtSendPath)

    fetch(this.backendConnect + "/" + this.mqqtSendPath, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": message
      })
    })
      .catch(console.log)
    //
  };

  handleChange = (val: string) => (event: any) => {
    //alert(event.target.value);
    console.log(val, event)
    this.message = event.target.value;
  };


  render() {

    return (
      <div>
        <Navigation />
        <Box component="span" m={1}>
          <Grid item xs={6}>
            <Button variant="contained" color="default" onClick={this.sendMessage('start')}>
              Start
        <StartIcon />
            </Button>
            <Button variant="contained" color="default" onClick={this.sendMessage('stop')}>
              Stop
        <StopIcon />
            </Button>
          </Grid>

          <TextField
            id="standard-name"
            label="Message"
            margin="normal"
            onChange={this.handleChange('message')}
          />
          <button onClick={this.sendMessage('send-mqtt')}>Send</button>

          <p>{this.state.backend}</p>
        </Box>

      </div>
    );
  }
}