import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import StartIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import ClearIcon from '@material-ui/icons/RestoreFromTrash';


export default class ChangeRaceStatus extends React.Component {
   
    private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? "http://" + window.location.hostname + ":3001/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH

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


    render() {
        return (
            <Grid item xs={12}>
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
          </Grid>
        )
    };

};