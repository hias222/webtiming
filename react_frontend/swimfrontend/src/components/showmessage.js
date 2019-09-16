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
                size: 100,
                hourHandWidth: 2,
                minuteHandWidth: 2
            })
        } else {
            this.setState({
                size: 500
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

    render() {

        let heatclass = classnames('heatheader');

        let clocktime = parseInt(this.state.timediff) + parseInt(this.state.unixcompetitiontime);
        let unixtoshow = isNaN(clocktime) ? 1 : clocktime
        let newclocktime = new Date(unixtoshow);

        var { webcontent } = "";

        if (this.props.type === 'message') {
            webcontent = <p>{this.props.message}</p>
        }

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
                                {webcontent}
                            </Grid>
                            <Grid>
                                <Clock
                                    value={newclocktime}
                                    size={this.state.size}
                                    hourHandWidth={this.state.hourHandWidth}
                                    minuteHandWidth={this.state.minuteHandWidth}
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