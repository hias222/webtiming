import React from "react";
import { StartStopComponent } from "./StartStopComponent";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";

import Grid from '@material-ui/core/Grid';
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";

export class BaseFrontendWebComponent extends React.Component<BaseFrontendInterface, {}> {
    render() {

        return (
            <div>
                <Grid>
                    <HeaderEventHeatComponent
                        EventHeat={this.props.EventHeat}
                    />
                    <StartStopComponent
                        startdelayms={this.props.startdelayms}
                        EventHeat={this.props.EventHeat}
                        runningTime={this.props.runningTime}
                    />
                </Grid>
                <Grid>
                    {this.props.lanes.map((lane, index) => (
                        <Grid key={index}>
                            <SingleLaneStaticComponent
                                lane={lane}
                                index={index}
                                displayMode={this.props.displayMode}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}
