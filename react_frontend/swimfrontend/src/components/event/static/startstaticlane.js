import React from 'react'


import getBirthYear from '../../getBirthYear'
import getEntryTime from '../../getEntryTime'


import classnames from 'classnames';



class StartStaticLane extends React.Component {
    //const Service = ({ service }) => {

    isEven(n) {
        return n % 2 === 0;
    }

    render() {

        let laneclass = classnames('startstaticlaneodd')

        if (this.isEven(this.props.lane.lane)) {
            laneclass = classnames('startstaticlaneeven');
        }

        return (
            <tr key={this.props.lane.lane} className={laneclass}>
                <td align="left">{this.props.lane.lane}</td>
                <td align="left">{this.props.lane.firstname} {this.props.lane.lastname} (
                {getBirthYear(this.props.lane.birthdate)}) {this.props.lane.name}
                </td>
                <td align="right"> {getEntryTime(this.props.lane.entrytime)}</td>
            </tr>
        )
    }
};

export default StartStaticLane