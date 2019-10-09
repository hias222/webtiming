import React from 'react'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { styled } from '@material-ui/styles';


import ResultIcon from '@material-ui/icons/Flag';
import LinkIcon from '@material-ui/icons/Link';
import ImpIcon from '@material-ui/icons/Info';

import Button from '@material-ui/core/Button';

import Clock from 'react-clock';

import classnames from 'classnames';
import Image from '../../../resources/water2.jpg';


const MyPaper = styled(Paper)({
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `calc(100vw-100)`,
    margin: 0,
    padding: 0,
});


const MyButton = styled(Button)({
    //backgroundColor: 'rgba(196, 196, 196, 0.5);',
    background: 'rgba(196, 196, 196, 0.5)',
    backgroundColor: '#ff0000',
});

const MyGrid = styled(Grid)({
    //backgroundColor: 'rgba(196, 196, 196, 0.5);',
    background: 'rgba(196, 196, 196, 0.5)',
    backgroundColor: '#ff0000'
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
                                    <MyButton variant="contained" href='https://sg-mfr.de' target='_blank' className={varfooter}>
                                        <LinkIcon></LinkIcon>
                                        SG Mittelfranken
                                    </MyButton>
                                </Grid>
                                <Grid className={varfooter} >
                                    <MyButton variant="contained" href='https://swimtiming.azurewebsites.net/' className={varfooter} target='_blank' >
                                        <ResultIcon></ResultIcon>
                                        Ergebnisse
                                    </MyButton>
                                </Grid>
                                <Grid className={varfooter} >
                                    <MyButton variant="contained" href='https://www.sgfuerth.de/kontakt-impressum/' target='_blank' className={varfooter} >
                                        <ImpIcon></ImpIcon>
                                        Kontakt/Impressum
                                    </MyButton>
                                </Grid>
                            </MyGrid>
                            <Grid item xs={12} className={varmessagetext_main}>
                                {this.props.info.competition}
                            </Grid>
                            <Grid item xs={6} container justify='center' >
                                {this.splitMessageLines()}
                            </Grid>
                            <Grid item xs={6} container justify='center' >
                                <table height='100%'>
                                    <tbody>
                                        <tr >
                                            <td align='middle' >
                                                <Clock
                                                    value={newclocktime}
                                                    size={this.state.size}
                                                    hourHandWidth={this.state.hourHandWidth}
                                                    minuteHandWidth={this.state.minuteHandWidth}
                                                    className="varmessage_clock"
                                                //react-clock__hand__body
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>

                    </MyPaper>
                </Container>

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