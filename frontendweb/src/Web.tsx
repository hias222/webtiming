import React from 'react';
import './styles/Web.scss';
import { WsSocketState } from './services/WsSocketState';
import { FrontendState } from './state/FrontendState';
import { BaseFrontendWebComponent } from './components/BaseFrontendWebComponent';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { eventHeat } from './types/EventHeat';


// https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
// https://medium.com/@RupaniChirag/parent-child-communication-in-vue-angular-and-react-all-in-typescript-9a47c75cbf74

///type FrontendState = {
//  event: string;
//};

class Web extends React.Component<{}, FrontendState> {

  mylane: string[];

  evenHeat: eventHeat;

  constructor(props: {}) {
    super(props);
    this.onStartStop = this.onStartStop.bind(this)
    this.onEventHeatChange = this.onEventHeatChange.bind(this)
    this.onLaneChange = this.onLaneChange.bind(this)
    this.onDisplayModeChange = this.onDisplayModeChange.bind(this)
    this.onRunningTimeChange = this.onRunningTimeChange.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
    this.evenHeat = {
      name: "new",
      heatnr: "0",
      eventnr: "0"
  }
    this.state = {
      startdelayms: 0,
      runningTime: "",
      racerunning: false,
      eventHeat: this.evenHeat,
      lanes: [],
      displayMode: "race",
      MessageText: "",
      MessageTime: "",
      VideoVersion: ""
    }
    this.mylane = []
  }

  async onStartStop(startdelayms: number) {
    console.log("App: start or stop event (" + startdelayms + ")")
    // start without stop
    if (startdelayms !== -1) {
      if (this.state.racerunning) {
        this.setState({
          startdelayms: 0,
          racerunning: false
        })
      }
    }

    this.setState({
      startdelayms: startdelayms,
      racerunning: true
    })
  }


  onRunningTimeChange(RunningTime: string) {
    this.setState({
        runningTime: RunningTime
    });
}

  onEventHeatChange(EventHeat: eventHeat) {
    console.log(EventHeat)
    this.setState({
      eventHeat: EventHeat
    })
  }

  onLaneChange(lane: number, LaneData: any) {
    if (lane === -1) {
      console.log("+++++ clear all")
      this.setState({
        lanes: this.mylane = []
      })
    } else {
      console.log(lane + ": change")
      // push
      //https://www.w3schools.com/js/js_array_methods.asp

      if (lane > this.mylane.length) {
        this.mylane.push(LaneData)
      } else {
        this.mylane[lane - 1] = (LaneData)
      }

      this.setState({
        lanes: this.mylane
      })
    }
  }

  onDisplayModeChange(displaymode: string) {
    console.log("change to " + displaymode)
    this.setState({
      displayMode: displaymode
    })
  }

  onMessageChange(message: string) {
    console.log("change to " + message)
    this.setState({
      displayMode: message
    })
  }

  handleFullscreen = (e: any) => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    }
    /*
    else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen()
    }
    */

  }

  render() {

    //height={process.env.REACT_APP_PIXEL_FROM_TOP} className={staticemptytable}

    return (
      <div>
        <WsSocketState
          onStartStop={this.onStartStop}
          onEventHeatChange={this.onEventHeatChange}
          onLaneChange={this.onLaneChange}
          onDisplayModeChange={this.onDisplayModeChange}
          onMessageChange={this.onMessageChange}
          onRunningTimeChange={this.onRunningTimeChange}
        />
        <Container>
          <Paper>
            <Grid>
              <BaseFrontendWebComponent
                startdelayms={this.state.startdelayms}
                EventHeat={this.state.eventHeat}
                lanes={this.state.lanes}
                displayMode={this.state.displayMode}
                runningTime={this.state.runningTime}
              />
            </Grid>
          </Paper>
        </Container>
      </div>
    )
  }
}
export default Web;

