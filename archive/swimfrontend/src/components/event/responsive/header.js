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

import ResultIcon from '@material-ui/icons/Flag';
import LinkIcon from '@material-ui/icons/Link';
import ImpIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';

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
    margin: 0,
    padding: 0,
});

const MyGrid = styled(Grid)({
    //backgroundColor: 'rgba(196, 196, 196, 0.5);',
    background: 'rgba(196, 196, 196, 0.5)',
    backgroundColor: '#ff0000'
});

const MyButton = styled(Button)({
    //backgroundColor: 'rgba(196, 196, 196, 0.5);',
    background: 'rgba(196, 196, 196, 0.5)',
    backgroundColor: '#ff0000'
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
                        <div className={heatclass}>Name/Verein/Meldezeit</div>
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
                        <div className={heatclass_time}>Zeit</div>
                    </TableCell>
                    <TableCell>
                        <div className={heatclass}>Name/Verein</div>
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

    getSwimStyle() {
        //ToDo Staffeln
        var swimstyle = getSwimStyles(this.props.info.swimstyle);

        if (swimstyle === "UNKNOWN") {
            if (typeof (this.props.info.name) !== "undefined" && this.props.info.name) {
                return this.props.info.name;
            }
        }
        return this.props.info.distance + "m " + swimstyle;
    }


    render() {
        var style = this.getSwimStyle();
        var race = getRaceType(this.props.info.round);
        let heatclass = classnames('heatheader');
        let varfooter = classnames('varfooter_race');

        let heatclass_event = classnames('heatheader_event');
        let heatclass_time = classnames('heatheader_time');

        return (
            <div>
                <Container maxWidth="md">
                    <MyPaper >
                        <Grid container spacing={0} >
                            <MyGrid className={varfooter}
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                                color='inherit'
                            >
                                <Grid className={varfooter} >
                                    <MyButton variant="contained" href='https://www.sgfuerth.de/events/ausschreibung-kinderschwimmen-2019/' target='_blank' className={varfooter}>
                                        <LinkIcon></LinkIcon>
                                        Kinderschwimmen
                                    </MyButton>
                                </Grid>
                                <Grid className={varfooter} >
                                    <MyButton variant="contained" href='https://swimtiming.azurewebsites.net' className={varfooter} target='_blank' >
                                        <ResultIcon></ResultIcon>
                                        Ergebnisse/Meldungen
                                    </MyButton>
                                </Grid>
                                <Grid className={varfooter} >
                                    <MyButton variant="contained" href='https://www.sgfuerth.de/kontakt-impressum/' target='_blank' className={varfooter} >
                                        <ImpIcon></ImpIcon>
                                        Kontakt/Impressum
                                    </MyButton>
                                </Grid>
                            </MyGrid>
                            <Grid item xs={12}>
                                <Grid >
                                    <div className={heatclass}>
                                        {this.props.info.competition}
                                    </div>
                                    <div className={heatclass_event}>
                                        Wettkampf: {this.props.info.event} {style} {race}: {this.props.info.heat}
                                    </div>
                                </Grid>
                                <Grid align="right" >
                                    <div className={heatclass_time}>
                                        {this.format(this.props.time)}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Table >
                                    {this.tableheader}
                                    {this.laneversion}
                                </Table>
                            </Grid>
                        </Grid>
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