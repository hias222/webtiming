import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PoolIcon from '@material-ui/icons/Pool';

import Typography from '@material-ui/core/Typography';

import { styled } from '@material-ui/styles';

const NormalTableCell = styled(TableCell) ({
    fontSize: '1.2em'
})

const ClubTypography = styled(Typography) ({
    fontSize: '0.7em'
})

class Lane extends React.Component {
    //const Service = ({ service }) => {

    render() {
        var {myicon} = ""
        //&& this.props.lane.place !== null
        if (this.props.lane.place !== 'undefined') {
            if (this.props.lane.place === "0") {
                myicon = <PoolIcon/>
            } else {
                myicon = this.props.lane.place
            }
        } else {
            myicon = "-"
        }

        var { time } = ""
        if (this.props.lane.time !== 'undefined') {
            time = this.props.lane.time
        } else {
            time = ""
        }

        return (
            <TableRow key={this.props.lane.lane}>
                <NormalTableCell align="left">{this.props.lane.lane}</NormalTableCell>
                <NormalTableCell align="left">{myicon}
                </NormalTableCell>
                <NormalTableCell align="left">{this.props.lane.firstname} {this.props.lane.lastname}
                <br></br>
                <ClubTypography fontSize='0.1em'>
                {this.props.lane.name}
                </ClubTypography>
                </NormalTableCell>
                <NormalTableCell align="right">{time}</NormalTableCell>
            </TableRow>
        )
    }
};

export default Lane