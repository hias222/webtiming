import React from 'react'
import StaticLane from './staticlane';
import LinearProgress from '@material-ui/core/LinearProgress';


class Static extends React.Component {

    constructor(props) {
        super(props);
        console.log("Header Services init")
    }

    componentDidUpdate() {
        console.log("update data heat " + this.props.info.heat);
    }


    format(ms) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 10);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + (fract < 10 ? '0' : '') + fract;
    }

    render() {

        return (
            <div>
                <table>
                    <tr> {this.props.info.competition}</tr>
                    <tr> {this.props.info.distance}m {this.props.info.swimstyle}</tr>
                    <tr> Wettkampf: {this.props.info.event}  Lauf: {this.props.info.heat}</tr>
                    <tr align='right'>{this.format(this.props.time)}</tr>
                </table>
                    <table >
                        <thead>
                            <tr>
                                <td>Bahn</td>
                                <td align="left">Platz</td>
                                <td >Name</td>
                                <td align="right">Zeit</td>
                            </tr>
                        </thead>
                        <tbody>

                            {this.props.lanes.map((lane, index) => (
                                <StaticLane lane={lane} key={index} />
                            ))}
                        </tbody>
                    </table>
             
                <br></br>
                
                <div>
                    {this.props.responsestate
                        ?
                        <LinearProgress variant="determinate" />

                        : <LinearProgress />}
                </div>
            </div>
                
        )
    }
};

export default Static
