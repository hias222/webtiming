import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Lane extends React.Component {
    //const Service = ({ service }) => {
    
    render() {
        var { place } = ""
        //&& this.props.lane.place !== null
        if(this.props.lane.place !== 'undefined' ){
            place  = this.props.lane.place
         } else {
            place  = "-"
         }

         var { time } = ""
        //&& this.props.lane.place !== null
        if(this.props.lane.time !== 'undefined' ){
            time  = this.props.lane.time
         } else {
            time  = ""
         }

        return (
            <TableRow key={this.props.lane.lane}>
                <TableCell align="left">{this.props.lane.lane}</TableCell>
                <TableCell align="left">{place}</TableCell>
                <TableCell align="left">{this.props.lane.firstname} {this.props.lane.lastname} ( {this.props.lane.name})</TableCell>
                <TableCell align="right">{time}</TableCell>
                <TableCell align="right">-</TableCell>
            </TableRow>
        )
    }
};

export default Lane