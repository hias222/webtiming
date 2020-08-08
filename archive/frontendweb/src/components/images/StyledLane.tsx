import React from "react";
import classnames from 'classnames';
import { LaneData } from "../../interfaces/lanedatainterface";
import { Grid, Box } from "@material-ui/core";

import LaneNumber from "./LaneNumber";

export default class StyledLane extends React.Component<LaneData, {}> {

    box_height: number;

    constructor(props: LaneData) {
        super(props)
        this.box_height = process.env.REACT_APP_BOX_HEIGHT !== undefined ? Number(process.env.REACT_APP_BOX_HEIGHT) : 50
    }

    checkName() {
        let namelength = 20;

        let sizeName = this.props.swimmer.name.length;
        let sizeLastName = (this.props.swimmer.firstName !== undefined) ? this.props.swimmer.firstName.length : 0

        if (sizeName > (namelength - 2)) {
            console.log("short name")
            return this.props.swimmer.name.substr(0, (namelength - 2));
        }

        if (sizeName + sizeLastName > namelength) {
            return this.props.swimmer.name + " " + this.props.swimmer.firstName?.substr(0, 1) + ".";
        }

        let name = this.props.swimmer.name + " " + this.props.swimmer.firstName

        return name
    }

    formatEntryTime() {
        console.log("- " + this.props.entrytime)

        return this.props.entrytime;
    }

    render() {
        let staticlaneeven = classnames('staticlaneeven');
        let staticbox = classnames('staticbox');

        let correctName = this.checkName();

        // className={staticlaneeven}
        //borderColor={"green"}
        return <Grid container >
            <Grid item xs={1} >
                <Box text-align={"center"} height={this.box_height} borderTop={1} borderLeft={0} borderBottom={0} className={staticbox}>
                    <Grid className={staticlaneeven}>  <LaneNumber
                        laneNumber={this.props.lane} />
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={11}>
                <Box height={this.box_height} borderTop={1} borderBottom={0} className={staticbox}>
                    <Grid className={staticlaneeven}>  {correctName} ({this.props.swimmer.birthyear}) </Grid>
                </Box>
            </Grid>
        </Grid>

    }
}
