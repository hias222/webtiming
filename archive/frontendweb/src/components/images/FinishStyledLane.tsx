import React from "react";
import classnames from 'classnames';
import { LaneData } from "../../interfaces/lanedatainterface";
import { Grid, Box } from "@material-ui/core";
import LaneNumberFinish from "./LaneNumberFinish";
export default class FinishStyledLane extends React.Component<LaneData, {}> {

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

    render() {
        let staticlaneeven = classnames('staticlaneeven');
        let correctName = this.checkName();
        let staticbox = classnames('staticbox');

        return <Grid container item xs={12}>
            <Grid item xs={2}>
                <Box height={this.box_height} borderTop={1} borderLeft={0} borderBottom={0} className={staticbox}>
                    <Grid className={staticlaneeven}>
                        <LaneNumberFinish
                            laneNumber={this.props.lane}
                            place={this.props.place}
                        />
                    </Grid>
                </Box>

            </Grid>

            <Grid item xs={7}>

                <Box height={this.box_height} borderTop={1} borderBottom={0} className={staticbox}>
                    <Grid className={staticlaneeven}>
                        {correctName}
                    </Grid>
                </Box>

            </Grid>
            <Grid item xs={3} text-align={"center"}>
                <Box height={this.box_height} borderTop={1} borderBottom={0} borderRight={0} className={staticbox}>
                    <Grid className={staticlaneeven}>
                        {this.props.finishtime}
                    </Grid>
                </Box>

            </Grid>
        </Grid>;

    }
}
