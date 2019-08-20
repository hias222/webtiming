import React from 'react'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Lane from './lane';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

import { styled } from '@material-ui/styles';

const MyButton = styled(Button)({
    size: "large",
    border: 0,
});

const TimeButton = styled(Button)({
    fontSize: '1.3em',
    border: 0,
});

const MyPaper = styled(Paper)({
    background: 'linear-gradient(45deg, #4cd45a 20%, #FF8E53 70%)',
    marginTop: 3,
    width: '100%',
    overflowX: 'auto',
    marginBottom: 2,
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
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 100);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + fract;
    }

    render() {

        return (
            <div>
                <Box component="span" m={1} color="text.primary">
                    <Container maxWidth="md">
                        <MyPaper>
                            <Grid >
                                <MyButton variant="contained" color="primary" >
                                    {this.props.info.competition}
                                </MyButton>
                                <Button variant="contained" color="secondary">
                                    Wettkampf: {this.props.info.event} {this.props.info.distance}m {this.props.info.swimstyle}
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Lauf: {this.props.info.heat}
                                </Button>
                            </Grid>
                            <Grid align="right" >
                                <TimeButton variant="contained" color="primary">
                                    {this.format(this.props.time)}
                                </TimeButton>
                            </Grid>
                            <Table >
                                <TableHead>
                                    <TableRow>  
                                        <TableCell>Bahn</TableCell>
                                        <TableCell align="left">Platz</TableCell>
                                        <TableCell>Name<br></br>Verein</TableCell>
                                        <TableCell align="right">Zeit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.lanes.map((lane, index) => (
                                        <Lane lane={lane} key={index} />
                                    ))}
                                </TableBody>
                            </Table>
                        </MyPaper>
                        <br></br>

                        <div>
                            {this.props.responsestate
                                ?
                                ""
                                : <LinearProgress />}
                        </div>
                    </Container>
                </Box>

            </div>
        )
    }
};

export default Header
