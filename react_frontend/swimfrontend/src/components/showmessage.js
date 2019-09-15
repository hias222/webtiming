import React from 'react'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';

import Clock from 'react-clock';

import classnames from 'classnames';
//import Image from '../water2.jpg';


const MyPaper = styled(Paper)({
    //backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `calc(100vw-100)`,
    margin: 10,
    padding: 0,
});


class Showmessage extends React.Component {
    constructor(props) {
        super(props);
        console.log("Message Services init " + this.props.unixcompetitiontime + " " + this.props.type)
        //this.setState({
        //    date: new Date(),
        //    start: 0
        //})

        this.setClock = this.setClock.bind(this)
        this.clocktimer = this.clocktimer.bind(this)
        this.startTimer = this.startTimer.bind(this)
    }

    // die Uhr fängt keine Nuller ab
    state = {
        unixcompetitiontime: 0,
        startcompetition: 0
    }

    format(ms) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 100);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + fract;
    }

    setClock() {
        //1568556787
        this.setState({
            unixcompetitiontime: Math.floor(this.props.unixcompetitiontime * 1000),
            datestart: new Date(),
            size: 500
        })
    }

    startTimer() {
        this.setState({
            datestart: new Date(),
        })
        this.clocktimerid = setInterval(this.clocktimer, 1000);
    }

    clocktimer() {
        this.setState({
            timediff: Date.now() - this.state.datestart
        })
    }

    componentWillUnmount() {
        clearInterval(this.clocktimerid);
    }


    componentDidMount() {
        this.setClock();
        this.startTimer();
    }

    render() {

        let heatclass = classnames('heatheader');

        let clocktime = parseInt(this.state.timediff) + parseInt(this.state.unixcompetitiontime);
        let unixtoshow = isNaN(clocktime) ? 1 : clocktime
        let newclocktime = new Date(unixtoshow);

        return (
            <div >
                <Box component="span" m={1} color="text.primary">
                    <Container maxWidth="md">
                        <MyPaper >
                            <Grid >
                                <div className={heatclass}>
                                    {this.props.info.competition}
                                </div>
                            </Grid>
                            <Grid>
                                <Clock
                                    value={newclocktime} 
                                    size={this.state.size}
                                    hourHandWidth='12'
                                    hourMarksWidth='12'
                                    hourMarksLength='25'
                                    minuteHandWidth='12'
                                    backround-color="red"
                                    position='inherit'
                                    //react-clock__hand__body
                                />
                            </Grid>
                        </MyPaper>
                    </Container>
                </Box>
            </div>
        )
    }
};

export default Showmessage

/*

                        <Iframe url="https://swimtiming.azurewebsites.net"
                            width="100%"
                            height="600px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                        />
                        */