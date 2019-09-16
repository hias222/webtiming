import React from 'react'

import Typography from '@material-ui/core/Typography';

import { styled } from '@material-ui/styles';


const ClubTypography = styled(Typography) ({
    fontSize: '0.7em'
})

class StaticLane extends React.Component {
    //const Service = ({ service }) => {

    render() {
        var { place } = ""
        //&& this.props.lane.place !== null
        if (this.props.lane.place !== 'undefined') {
            if (this.props.lane.place === "0") {
                place = "<-->"
            } else {
                place = this.props.lane.place
            }
        } else {
            place = "-"
        }

        var { time } = ""
        if (this.props.lane.time !== 'undefined') {
            time = this.props.lane.time
        } else {
            time = ""
        }

        return (
            <tr key={this.props.lane.lane}>
                <td align="left">{this.props.lane.lane}</td>
                <td align="left">{place}</td>
                <td align="left">{this.props.lane.firstname} {this.props.lane.lastname}
                <br></br>
                <ClubTypography fontSize='0.1em'>
                {this.props.lane.name}
                </ClubTypography>
                </td>
                <td align="right">{time}</td>
            </tr>
        )
    }
};

export default StaticLane