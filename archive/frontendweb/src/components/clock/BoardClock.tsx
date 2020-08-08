import React from 'react'

import Clock from 'react-clock'
//import Clock from 'react-clock';

import classnames from 'classnames';
//import Image from '../water2.jpg';

interface ClockInterface {
    unixcompetitiontime: string,
    type: string
}

export type ClockState = {
    unixcompetitiontime: number,
    startcompetition: number,
    hourHandWidth: number,
    minuteHandWidth: number,
    datestart: number,
    size: number,
    timediff: number,
    type: string
};


export default class BoardClock extends React.Component<ClockInterface, ClockState> {

    clocktimerid: any

    constructor(props: ClockInterface) {
        super(props);
        console.log("BoardClock init " + this.props.unixcompetitiontime + " - " + this.props.type)
        this.setClock = this.setClock.bind(this)
        this.clocktimer = this.clocktimer.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.restartMessage = this.restartMessage.bind(this)

        this.state = {
            unixcompetitiontime: 0,
            startcompetition: 0,
            hourHandWidth: 5,
            minuteHandWidth: 5,
            size: 200,
            timediff: 0,
            datestart: Date.now(),
            type: this.props.type
        }

    }

    // die Uhr fängt keine Nuller ab

    format(ms: number) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 100);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + fract;
    }

    setClock() {
        //1568556787
        this.setState({
            unixcompetitiontime: Math.floor(parseInt(this.props.unixcompetitiontime)),
            datestart: Date.now()
        })

        console.log("clock " + parseInt(this.props.unixcompetitiontime) + " " + this.props.unixcompetitiontime)

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
            datestart: Date.now()
        })
        console.log("start clock")
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

    componentDidUpdate(prevProps: ClockInterface) {

        if (prevProps.unixcompetitiontime !== this.props.unixcompetitiontime) {
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

    /*
    splitMessageLines() {
        var webcontent = "";
        let staticmessagetext_main = classnames('staticmessagetext_main');

        var strmessage = this.props.message.toString();
        var lines = strmessage.split('\\n');

        if (this.props.type === 'message') {

            webcontent = <table >
                <tbody>
                    {lines.map((msg, index) => (
                        <tr className={staticmessagetext_main} key={index}>
                            <td>{msg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            return webcontent;
        }

        return webcontent
    }
    */

    render() {
        let staticmessagetable = classnames('staticmessagetable');
        //let staticmessagetable_header = classnames('staticmessagetable_header');
        let staticmessagetext_main = classnames('staticmessagetext_main');
        //let staticmessagetext_header = classnames('staticmessagetext_header');

        let clocktime = (this.state.unixcompetitiontime * 1000) + this.state.timediff;
        let unixtoshow = isNaN(clocktime) ? 1 : clocktime
        let newclocktime = new Date(unixtoshow);

        console.log("start clock " + this.state.unixcompetitiontime) 
        
        return (
            <div>
                <table className={staticmessagetable}>
                    <tbody>
                        <tr className={staticmessagetext_main}>
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
                    </tbody>
                </table>
            </div>
        )
    }
};

