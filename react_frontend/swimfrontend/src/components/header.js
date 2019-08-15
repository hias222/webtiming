import React from 'react'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Lane from './lane';


class Header extends React.Component {

    constructor(props) {
        super(props);
        console.log("Header Services init")
        
    }

    componentDidUpdate() {
        console.log("new data " + JSON.stringify(this.props.lanes));
    }

    

    //const Services = ({ services }) => {
    render() {
        return (
            <div>
                <Paper >
                        <Button variant="contained" color="primary">
                            {this.props.info.competition}
                        </Button>
                        <Button variant="contained" color="secondary">
                            {this.props.info.distance}m {this.props.info.swimstyle}
                        </Button>
                        <Button variant="contained" color="primary">
                        Wettkampf: {this.props.info.event}
                        </Button>
                        <Button variant="contained" color="secondary">
                        Lauf: {this.props.info.heat}
                        </Button>
                        
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Bahn</TableCell>
                                        <TableCell align="left">PLatz</TableCell>
                                        <TableCell >Name</TableCell>
                                        <TableCell align="right">Zeit</TableCell>
                                        <TableCell align="right">Sonstiges</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
   
                                    {this.props.lanes.map((lane, index) => (
                                        <Lane lane={lane} key={index} />
                                    ))}               
                                </TableBody>
                            </Table>
                        </Paper>
              
            </div>
        )
    }
};

export default Header
