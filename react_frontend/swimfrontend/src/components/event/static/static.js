import React from 'react'
import StaticLane from './staticlane';
import StartStaticLane from './startstaticlane';
import LinearProgress from '@material-ui/core/LinearProgress';

import classnames from 'classnames';

import getSwimStyles from '../../getSwimStyles';
import getRaceType from '../../getRaceType';

class Static extends React.Component {

    constructor(props) {
        super(props);
        console.log("Header Services init")
        this.laneversion = <tbody></tbody>
        this.tableheader = <thead></thead>
        this.connectionstatus = <LinearProgress />

        this.state = {
            fullscreen: false
        }
    }

    componentDidUpdate() {
        this.setLaneVersion()
        this.setTableHeader()
        this.getConnectionStatus()
    }

    getConnectionStatus() {

        if (this.props.responsestate) {
            this.connectionstatus = ""
        } else {
            this.connectionstatus = <p>no connection to backend</p>
        }

    }

    setTableHeader() {
        let staticheatclass = classnames('staticheatheader');
        let staticheatclass_time = classnames('staticheatheader_time');
        let staticbackclass = classnames('staticheatbackground');

        if (this.props.showstartlist) {
            this.tableheader = <thead>
                <tr className={staticbackclass}>
                    <td >
                        <div className={staticheatclass}>Bahn</div></td>
                    <td>
                        <div className={staticheatclass}>Name/Jahrgang/Verein/Meldezeit</div>
                    </td>
                </tr>
            </thead>
        } else {
            this.tableheader = <thead>
                <tr className={staticbackclass}>
                    <td >
                        <div className={staticheatclass}>Bahn</div></td>
                    <td>
                        <div className={staticheatclass}>Platz</div>
                    </td>
                    <td>
                        <div className={staticheatclass}>Name/Verein</div>
                    </td>
                    <td>
                        <div className={staticheatclass_time}>Zeit</div>
                    </td>
                </tr>
            </thead>
        }
    }

    setLaneVersion() {
        if (this.props.showstartlist) {
            this.laneversion = <tbody>
                {this.props.lanes.map((lane, index) => (
                    <StartStaticLane
                        lane={lane}
                        key={index}
                        rowsperlane={this.props.rowsperlane} />
                ))}
            </tbody>
        } else {
            this.laneversion = <tbody>
                {this.props.lanes.map((lane, index) => (
                    <StaticLane
                        lane={lane}
                        key={index}
                        rowsperlane={this.props.rowsperlane} />
                ))}
            </tbody>
        }
    }

    format(ms) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 100);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + fract;
    }

    handleToggle = (e) => {
        const el = document.documentElement
        if (el.requestFullscreen) {
          el.requestFullscreen()
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen()
        }
        this.setState({
          fullscreen: true
        })
      }

    render() {
        var style = getSwimStyles(this.props.info.swimstyle);
        var race = getRaceType(this.props.info.round);

        let statictable = classnames('statictable');
        let staticmaintable = classnames('staticmaintable');
        let staticheadertable = classnames('staticheadertable');

        let staticeventname = classnames('staticeventname');
        let staticheatevent = classnames('staticheatevent');
        let staticheader_time = classnames('staticheader_time');
        let staticemptytable = classnames('staticemptytable');

        let staticfooter = classnames('staticfooter');
        let internaltable = classnames('internaltable');

        var { fullscreen } = "";
        if (this.state.fullscreen !== true) {
            fullscreen = <button onClick={this.handleToggle}>Full screen {this.state.webtype}</button>
        }

        return (


            <div>
                <div>
                    <table height={process.env.REACT_APP_PIXEL_FROM_TOP} className={staticemptytable} >
                        <tbody>
                            <tr><td>Rows per lane: {this.props.rowsperlane}</td>
                            <td>{fullscreen}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className={statictable}>
                        <tbody>
                            <tr>
                                <td>
                                    <table className={staticheadertable}>
                                        <tbody>
                                            <tr className={staticeventname}>
                                                <td>{this.props.info.competition}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className={staticheadertable}>
                                        <tbody>
                                            <tr className={staticheatevent}>
                                                <td>Wettkampf: {this.props.info.event} {this.props.info.distance}m {style} {race}
                                                    : {this.props.info.heat}</td>
                                                <td className={staticheader_time}>{this.format(this.props.time)}</td>
                                            </tr>
                                        </tbody>
                                    </table >
                                    <table className={staticmaintable}>
                                        {this.tableheader}
                                        {this.laneversion}
                                    </table>
                                    <div>
                                        {this.connectionstatus}
                                    </div>
                                </td>
                            </tr>
                            <tr className={staticfooter}>
                                <td>
                                    <table className={internaltable}>
                                        <tbody>
                                            <tr>
                                                <td align="left">
                                                    BSV - SG Mittelfranken
                                            </td>
                                                <td align="right">
                                                    Timing SG Fürth
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div >
            </div>

        )
    }
};

export default Static
