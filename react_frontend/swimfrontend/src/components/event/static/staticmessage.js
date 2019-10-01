import React from 'react'

import Clock from 'react-clock/dist/entry.nostyle'
//import Clock from 'react-clock';

import classnames from 'classnames';
//import Image from '../water2.jpg';


class Staticmessage extends React.Component {
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
                size: 200,
                hourHandWidth: 4,
                minuteHandWidth: 4
            })
        } else {
            this.setState({
                size: 290
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
        let staticmessagetext_main = classnames('staticmessagetext_main');

        var strmessage = this.props.message.toString();
        var lines = strmessage.split('\\n');

        if (this.props.type === 'message') {

            webcontent = <table >
                {lines.map((msg, index) => (
                    <tr className={staticmessagetext_main}>
                        <td>{msg}</td>
                    </tr>
                ))}
            </table>
            return webcontent;
        }

        return webcontent
    }

    render() {


        let staticemptytable = classnames('staticemptytable');

        let staticmessagetable = classnames('staticmessagetable');
        let staticmessagetable_header = classnames('staticmessagetable_header');

        let staticmessagetext_main = classnames('staticmessagetext_main');
        let staticmessagetext_header = classnames('staticmessagetext_header');

        //let message_clock = classnames('message-clock');

        let clocktime = parseInt(this.state.timediff) + parseInt(this.state.unixcompetitiontime);
        let unixtoshow = isNaN(clocktime) ? 1 : clocktime
        let newclocktime = new Date(unixtoshow);


        return (
            <div >
                <div>
                    <table className={staticemptytable} ></table>
                </div>
                <div>
                    <table className={staticmessagetable_header} >
                        <tr className={staticmessagetext_header}><td>
                            {this.props.info.competition}
                        </td></tr>
                    </table>
                    <table className={staticmessagetable}>
                        <tr className={staticmessagetext_main}>
                            <td>
                                {this.splitMessageLines()}
                            </td>
                            <td align='center'>
                                <Clock
                                    value={newclocktime}
                                    size={this.state.size}
                                    hourHandWidth={this.state.hourHandWidth}
                                    minuteHandWidth={this.state.minuteHandWidth}
                                    className="message_clock"
                                //react-clock__hand__body
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
};

export default Staticmessage

/*

                        <Iframe url="https://swimtiming.azurewebsites.net"
                            width="100%"
                            height="600px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                        />
                        */