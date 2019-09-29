import React from 'react'

import classnames from 'classnames';

class StaticLane extends React.Component {
    //const Service = ({ service }) => {

    isEven(n) {
        return n % 2 === 0;
    }

    render() {

        let laneclass = classnames('staticlaneodd')

        if (this.isEven(this.props.lane.lane)) {
            laneclass = classnames('staticlaneeven');
        }

        var { place } = ""
        //&& this.props.lane.place !== null
        if (this.props.lane.place !== 'undefined') {
            if (this.props.lane.place === "0") {
                place = "<-->"
            } else {
                place = this.props.lane.place
            }
        } else {
            place = "-"
        }

        var { time } = ""
        if (this.props.lane.time !== 'undefined') {
            time = this.props.lane.time
        } else {
            time = ""
        }

        return (
            <tr key={this.props.lane.lane} className={laneclass}>
                <td align="left">{this.props.lane.lane}</td>
                <td align="left">{place}</td>
                <td align="left">{this.props.lane.firstname} {this.props.lane.lastname}
                </td>
                <td align="right">{time}</td>
            </tr>
        )
    }
};

export default StaticLane