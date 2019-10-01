import React from 'react'
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Lane from './lane';
import StartLane from './startlane';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
//import Iframe from 'react-iframe'

import getSwimStyles from '../../getSwimStyles';

import { styled } from '@material-ui/styles';

import classnames from 'classnames';
import Image from '../../../resources/water2.jpg';
import getRaceType from '../../getRaceType';

const MyPaper = styled(Paper)({
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `calc(100vw-100)`,
    margin: 10,
    padding: 0,
});


class Header extends React.Component {

    constructor(props) {
        super(props);
        console.log("Header Services init")
        this.laneversion = <TableBody></TableBody>
        this.tableheader = <TableHead></TableHead>
    }

    componentDidUpdate() {
        this.setLaneVersion()
        this.setTableHeader()
    }

    setTableHeader() {
        let heatclass = classnames('heatheader');
        let heatclass_time = classnames('heatheader_time');
        let backclass = classnames('heatbackground');

        if (this.props.showstartlist) {
            this.tableheader = <TableHead>
                <TableRow className={backclass}>
                    <TableCell >
                        <div className={heatclass}>Bahn</div></TableCell>
                    <TableCell>
                        <div className={heatclass}>Name/Verein</div>
                    </TableCell>
                    <TableCell>
                        <div className={heatclass_time}>Meldezeit</div>
                    </TableCell>
                </TableRow>
            </TableHead>
        } else {
            this.tableheader = <TableHead>
                <TableRow className={backclass}>
                    <TableCell >
                        <div className={heatclass}>Bahn</div></TableCell>
                    <TableCell>
                        <div className={heatclass}>Platz</div>
                    </TableCell>
                    <TableCell>
                        <div className={heatclass}>Name/Verein</div>
                    </TableCell>
                    <TableCell>
                        <div className={heatclass_time}>Zeit</div>
                    </TableCell>
                </TableRow>
            </TableHead>
        }
    }

    setLaneVersion() {
        if (this.props.showstartlist) {
            this.laneversion = <TableBody>
                {this.props.lanes.map((lane, index) => (
                    <StartLane lane={lane} key={index} />
                ))}
            </TableBody>
        } else {
            this.laneversion = <TableBody>
                {this.props.lanes.map((lane, index) => (
                    <Lane lane={lane} key={index} />
                ))}
            </TableBody>
        }
    }


    format(ms) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 100);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + fract;
    }

    render() {

        var style = getSwimStyles(this.props.info.swimstyle);
        var race = getRaceType(this.props.info.round);
        let heatclass = classnames('heatheader');
        let heatclass_event = classnames('heatheader_event');
        let heatclass_time = classnames('heatheader_time');


        return (
            <div>
                <Container maxWidth="md">
                    <MyPaper >

                        <div >
                            <Grid >
                                <div className={heatclass}>
                                    {this.props.info.competition}
                                </div>
                                <div className={heatclass_event}>
                                    Wettkampf: {this.props.info.event} {this.props.info.distance}m {style} {race}: {this.props.info.heat}
                                </div>
                            </Grid>
                            <Grid align="right" >
                                <div className={heatclass_time}>
                                    {this.format(this.props.time)}
                                </div>
                            </Grid>
                            <Table >
                                {this.tableheader}
                                {this.laneversion}
                            </Table>
                        </div>
                    </MyPaper>
                </Container>
                <br></br>
                <div>
                    {this.props.responsestate
                        ?
                        ""
                        : <LinearProgress />}
                </div>
            </div>
        )
    }
};

export default Header

/*

                        <Iframe url="https://swimtiming.azurewebsites.net"
                            width="100%"
                            height="600px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                        />
                        */