import React from 'react';
import './styles/App.scss';
import { WsSocketState } from './services/WsSocketState';
import { FrontendState } from './state/FrontendState';

import classnames from 'classnames';
import { Box } from '@material-ui/core';
import { MessageFrontendComponent } from './components/messages/MessageFrontendComponent';
import { BaseFrontendStaticComponent } from './components/BaseFrontendStaticComponent';
import { eventHeat } from './types/EventHeat';

// https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
// https://medium.com/@RupaniChirag/parent-child-communication-in-vue-angular-and-react-all-in-typescript-9a47c75cbf74
///type FrontendState = {
//  event: string;
//};


export default class Lcd extends React.Component<{}, FrontendState> {

    mylane: string[];
    correctValueForLaneNull: number;
    evenHeat: eventHeat;

    window_width: number;
    window_height: number;
    //PIXEL_FROM_TOP
    window_top_pixel: number;


    constructor(props: {}) {
        super(props);
        this.onStartStop = this.onStartStop.bind(this);
        this.onEventHeatChange = this.onEventHeatChange.bind(this);
        this.onLaneChange = this.onLaneChange.bind(this);
        this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onRunningTimeChange = this.onRunningTimeChange.bind(this);

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
            MessageTime: Date.now().toString(),
            VideoVersion: ""
        };
        this.mylane = [];
        this.correctValueForLaneNull = 0;
        this.window_width = process.env.REACT_APP_PIXEL_WIDTH !== undefined ? Number(process.env.REACT_APP_PIXEL_WIDTH) : 512
        this.window_height = process.env.REACT_APP_PIXEL_HEIGHT !== undefined ? Number(process.env.REACT_APP_PIXEL_HEIGHT) : 384
        this.window_top_pixel = process.env.REACT_APP_PIXEL_FROM_TOP !== undefined ? Number(process.env.REACT_APP_PIXEL_FROM_TOP) : 0

    }
    async onStartStop(startdelayms: number) {
        console.log("App: start or stop event (" + startdelayms + ")");
        // start without stop
        if (startdelayms !== -1) {
            if (this.state.racerunning) {
                this.setState({
                    startdelayms: 0,
                    racerunning: false
                });
            }
        }
        this.setState({
            startdelayms: startdelayms,
            racerunning: true
        });
    }

    onEventHeatChange(EventHeat: eventHeat) {
        this.setState({
            eventHeat: EventHeat
        });
    }


    onRunningTimeChange(RunningTime: string) {
        this.setState({
            runningTime: RunningTime
        });
    }

    onLaneChange(lane: number, LaneData: any) {
        if (lane === -1) {
            console.log("+++++ clear all")
            this.correctValueForLaneNull = 0;
            this.setState({
                lanes: this.mylane = []
            })
        } else {

            // eslint-disable-next-line
            if (lane == 0 && this.correctValueForLaneNull != 1) {
                console.log("+++++ 0")
                this.correctValueForLaneNull = 1;
            }
            var sizeLanes = this.mylane.length - this.correctValueForLaneNull

            if (lane > sizeLanes) {
                console.log(lane + ": new (" + this.correctValueForLaneNull + ")")
                this.mylane.push(LaneData)
            } else {
                this.mylane[lane - 1 + this.correctValueForLaneNull] = (LaneData)
                console.log(lane + ": change (" + this.correctValueForLaneNull + ")")
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

    onMessageChange(message: any) {

        if (message.version !== undefined) {
            this.setState({
                VideoVersion: message.version
            })
        }

        if (message.value !== undefined) {
            this.setState({
                MessageText: message.value
            })
        }

        if (message.time !== undefined) {
            this.setState({
                MessageTime: message.time
            })
        } else {
            this.setState({
                MessageTime: Date.now().toString()
            })
        }

    }

    handleFullscreen = (e: any) => {
        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen();
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
    };


    render() {

        let webcontent = <p>starting</p>;
        let statictable = classnames('statictable');

        let buttonfullscreen = <div></div>

        if (this.window_top_pixel > 20) {
            buttonfullscreen = <div>
                <button onClick={this.handleFullscreen}>Full screen
                </button>
                <a href="/download/index.html">Links - Downloads
                </a>
            </div>
        }

        if (this.state.displayMode === 'message' || this.state.displayMode === 'clock' || this.state.displayMode === 'video') {
            webcontent = <MessageFrontendComponent
                diplayMode={this.state.displayMode}
                MessageText={this.state.MessageText}
                MessageTime={this.state.MessageTime}
                VideoVersion={this.state.VideoVersion}
                displayFormat={"lcd"}
            />
        } else {
            webcontent = <BaseFrontendStaticComponent
                startdelayms={this.state.startdelayms}
                EventHeat={this.state.eventHeat}
                lanes={this.state.lanes}
                displayMode={this.state.displayMode}
                runningTime={this.state.runningTime}
            />
        }
        return (
            <div>
                <Box height={this.window_top_pixel}>
                    {buttonfullscreen}
                </Box>
                <Box width={this.window_width} height={this.window_height} className={statictable}>
                    <WsSocketState onStartStop={this.onStartStop}
                        onEventHeatChange={this.onEventHeatChange}
                        onLaneChange={this.onLaneChange}
                        onDisplayModeChange={this.onDisplayModeChange}
                        onRunningTimeChange={this.onRunningTimeChange}
                        onMessageChange={this.onMessageChange} />
                    {webcontent}
                </Box>
            </div>
        );
    }
}
