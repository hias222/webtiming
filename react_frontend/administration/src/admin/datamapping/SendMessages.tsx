import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import StartIcon from '@material-ui/icons/PlayArrow';
import TextField from '@material-ui/core/TextField';

interface Props {
  type: string;
}

interface State {
  message: string,
  backend: [],
  event: string,
  heat: string,
  lane: string,
  rank: string,
};


export default class SendMessages extends React.Component<Props, State> {

  state: State = {
    message: "start",
    backend: [],
    event: "1",
    heat: "1",
    lane: "1",
    rank: "1"
  };

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? "http://" + window.location.hostname + ":3001/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH

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
      <Grid>
        <Grid>
          <TextField
            id="standard-name"
            label="Message"
            margin="dense"
            variant="filled"
            fullWidth
            multiline
            rows="5"
            onChange={this.handleChange('message')}
          />
        </Grid>
        <Grid>
          <Button variant="contained" color="default" onClick={this.sendMessage('message')}>Send
          <StartIcon /></Button>
        </Grid>
      </Grid>

    )
  };

};