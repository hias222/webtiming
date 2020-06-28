import React from "react";
import { StartStopComponent } from "./StartStopComponent";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import classnames from 'classnames';
import { HeaderEventHeatComponent } from "./HeaderEventHeatComponent";
import { SingleLaneStaticComponent } from "./SingleLaneStaticComponent";
import { Grid, Box } from "@material-ui/core";

export class BaseFrontendStaticComponent extends React.Component<BaseFrontendInterface, {}> {

    componentDidUpdate(prevProps: BaseFrontendInterface) {

        if (prevProps.lanes !== this.props.lanes) {
            console.log("update BaseFrontendStaticComponent lanes")
            //console.log("update " + JSON.stringify(this.props.lanes))
        }
    }

    render() {

        let staticlaneeven = classnames('staticlaneeven');
        let staticbox = classnames('staticbox');
        return (
            <div>

                <HeaderEventHeatComponent
                    EventHeat={this.props.EventHeat}
                />

                <StartStopComponent
                    startdelayms={this.props.startdelayms}
                    EventHeat={this.props.EventHeat}
                    runningTime={this.props.runningTime}
                />
                <Grid container >
                    {
                        this.props.lanes.map((lane, index) => (
                            <SingleLaneStaticComponent
                                key={index}
                                lane={lane}
                                index={index}
                                displayMode={this.props.displayMode}
                            />
                        ))
                    }
                    <Grid item xs={12}>
            
                            <Box
                                borderTop={1} borderLeft={0} borderBottom={0} className={staticbox}>
                                    <Grid className={staticlaneeven}> 
                                    {this.props.EventHeat.competition}
                                    </Grid>
                
                            </Box>
                   
                    </Grid>
                </Grid>


            </div >
        )
    }
}
