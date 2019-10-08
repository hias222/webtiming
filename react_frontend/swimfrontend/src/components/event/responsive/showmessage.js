import React from 'react'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';


import Clock from 'react-clock';

import classnames from 'classnames';
import Image from '../../../resources/water2.jpg';


const MyPaper = styled(Paper)({
    backgroundImage: `url(${Image})`,
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
        this.setClock = this.setClock.bind(this)
        this.clocktimer = this.clocktimer.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.restartMessage = this.restartMessage.bind(this)
    }

    // die Uhr fängt keine Nuller ab
    state = {
        unixcompetitiontime: 0,
        startcompetition: 0,
        hourHandWidth: 5,
        minuteHandWidth: 5
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
            datestart: new Date()
        })
        if (this.props.type === 'message') {
            this.setState({
                size: 150,
                hourHandWidth: 2,
                minuteHandWidth: 2
            })
        } else {
            this.setState({
                size: 200
            })
        }
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
        this.setState({
            type: this.props.type
        })
    }

    componentDidUpdate() {

        if (this.props.type !== this.state.type) {
            console.log("type change")
            this.restartMessage()
            this.setState({
                type: this.props.type
            })
        }
        //this.restartMessage();
    }

    async restartMessage() {
        clearInterval(this.clocktimerid);

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 1000)
        });

        let result = await promise; // wait till the promise resolves (*)
        console.log(result)

        this.setClock();
        this.startTimer();
    }

    splitMessageLines() {
        var webcontent = "";

        let varmessagetext_main = classnames('varmessagetext_main');

        var strmessage = this.props.message.toString();
        var lines = strmessage.split('\\n');

        if (this.props.type === 'message') {
            webcontent = <div className={varmessagetext_main}>
                {lines.map((msg, index) => (
                    <p>{msg}</p>
                ))}
            </div>
            return webcontent;
        }

        return webcontent
    }


    render() {

        let varmessagetext_main = classnames('varmessagetext_main');
        //let varmessage_clock = classnames('varmessage_clock');
        let varfooter = classnames('varfooter');

        let clocktime = parseInt(this.state.timediff) + parseInt(this.state.unixcompetitiontime);
        let unixtoshow = isNaN(clocktime) ? 1 : clocktime
        let newclocktime = new Date(unixtoshow);

        return (

            <div >
                <Box component="span" m={1} color="text.primary">
                    <Container maxWidth="md">
                        <MyPaper >
                            <Grid container spacing={1} className={varmessagetext_main}>
                                <Grid item xs={12}>
                                    {this.props.info.competition}
                                </Grid>
                                <Grid item xs={6}>
                                    {this.splitMessageLines()}
                                </Grid>
                                <Grid item xs={6}>
                                    <Clock
                                        value={newclocktime}
                                        size={this.state.size}
                                        hourHandWidth={this.state.hourHandWidth}
                                        minuteHandWidth={this.state.minuteHandWidth}
                                        className="varmessage_clock"
                                    //react-clock__hand__body
                                    />
                                </Grid>
                                <Grid item xs={6} className={varfooter}>
                                    <a href='https://swimtiming.azurewebsites.com/' className={varfooter}>Ergebnisse Wettkampf</a>
                                </Grid>

                                <Grid item xs={6} className={varfooter}>
                                    <a href='https://www.sgfuerth.de/kontakt-impressum/' className={varfooter}>Kontakt/Impressum</a>
                                </Grid>
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