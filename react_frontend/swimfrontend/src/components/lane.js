import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Lane extends React.Component {
    //const Service = ({ service }) => {
    render() {
        return (
            <TableRow key={this.props.lane.lane}>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">{this.props.lane.lane}</TableCell>
                <TableCell align="right">{this.props.lane.firstname} {this.props.lane.lastname} ( {this.props.lane.name})</TableCell>
                <TableCell align="right">123</TableCell>
                <TableCell align="right">-</TableCell>
                </TableRow>
        )
    }
};

export default Lane