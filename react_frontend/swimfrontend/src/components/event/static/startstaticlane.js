import React from 'react'

import Typography from '@material-ui/core/Typography';

import getBirthYear from '../../getBirthYear'
import getEntryTime from '../../getEntryTime'
import { styled } from '@material-ui/styles';


const ClubTypography = styled(Typography) ({
    fontSize: '0.7em'
})

class StartStaticLane extends React.Component {
    //const Service = ({ service }) => {

    render() {
    
        return (
            <tr key={this.props.lane.lane}>
                <td align="left">{this.props.lane.lane}</td>
                <td align="left">{this.props.lane.firstname} {this.props.lane.lastname} ({getBirthYear(this.props.lane.birthdate)})
                <br></br>
                <ClubTypography fontSize='0.1em'>
                {this.props.lane.name}
                </ClubTypography>
                </td>
                <td align="right"> {getEntryTime(this.props.lane.entrytime)}</td>
            </tr>
        )
    }
};

export default StartStaticLane