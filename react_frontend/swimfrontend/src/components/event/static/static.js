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
        let heatclass = classnames('staticheatheader');
        let heatclass_time = classnames('staticheatheader_time');
        let backclass = classnames('staticheatbackground');

        if (this.props.showstartlist) {
            this.tableheader = <thead>
                <tr className={backclass}>
                    <td >
                        <div className={heatclass}>Bahn</div></td>
                    <td>
                        <div className={heatclass}>Name/Verein</div>
                    </td>
                    <td>
                        <div className={heatclass_time}>Meldezeit</div>
                    </td>
                </tr>
            </thead>
        } else {
            this.tableheader = <thead>
                <tr className={backclass}>
                    <td >
                        <div className={heatclass}>Bahn</div></td>
                    <td>
                        <div className={heatclass}>Platz</div>
                    </td>
                    <td>
                        <div className={heatclass}>Name/Verein</div>
                    </td>
                    <td>
                        <div className={heatclass_time}>Zeit</div>
                    </td>
                </tr>
            </thead>
        }
    }

    setLaneVersion() {
        if (this.props.showstartlist) {
            this.laneversion = <tbody>
                {this.props.lanes.map((lane, index) => (
                    <StartStaticLane lane={lane} key={index} />
                ))}
            </tbody>
        } else {
            this.laneversion = <tbody>
                {this.props.lanes.map((lane, index) => (
                    <StaticLane lane={lane} key={index} />
                ))}
            </tbody>
        }
    }

    format(ms) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 10);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + (fract < 10 ? '0' : '') + fract;
    }

    render() {
        var style = getSwimStyles(this.props.info.swimstyle);
        var race = getRaceType(this.props.info.round);

        let staticmaintable = classnames('staticmaintable');

        return (
            <div>
                <table width="512px">
                    <tr> <span className={staticmaintable}>{this.props.info.competition}</span></tr>
                    <tr> Wettkampf: {this.props.info.event} {this.props.info.distance}m {style} {race}</tr>
                    <tr> Lauf: {this.props.info.heat}</tr>
                    <tr align='right'>{this.format(this.props.time)}</tr>
                </table>

                <table width="512px">
                    {this.tableheader}
                    {this.laneversion}
                </table>

                <br></br>

                <div>
                    {this.connectionstatus}
                </div>
            </div>

        )
    }
};

export default Static
