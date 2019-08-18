import React from 'react'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Lane from './lane';

import { styled } from '@material-ui/styles';

const MyButton = styled(Button)({
    border: 0,
  });

const MyPaper = styled(Paper)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
});
  
class Header extends React.Component {

    constructor(props) {
        super(props);
        console.log("Header Services init")
    }

    componentDidUpdate() {
        console.log("update data heat " + this.props.info.heat);
    }


  format(ms) {
    var minutes = Math.floor(ms / (1000 * 60)),
        seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
        fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 10);

    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + (fract < 10 ? '0' : '') + fract;
  }
    
    render() {

        return (
            <div>
                <MyPaper >
                        <MyButton variant="contained" color="primary" >
                            {this.props.info.competition}
                        </MyButton>
                        <Button variant="contained" color="secondary">
                            {this.props.info.distance}m {this.props.info.swimstyle}
                        </Button>

                        <Button variant="contained" color="primary">
                        Wettkampf: {this.props.info.event}
                        </Button>
                        <Button variant="contained" color="secondary">
                        Lauf: {this.props.info.heat}
                        </Button>
                        <Button variant="contained" color="primary">
                         {this.format(this.props.time)}
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
                </MyPaper>
            </div>
        )
    }
};

export default Header
