import React from 'react'

import classnames from 'classnames';
import getBirthYear from '../../getBirthYear'

class StaticLane extends React.Component {
    //const Service = ({ service }) => {

    isEven(n) {
        return n % 2 === 0;
    }

    //shortswimName = swimName.toString().substr(0, 40)

    getSwimmerName() {
        var swimmerName = "keine Belegung"
        var spanName = ""

        let staticclub = classnames('staticclub')
        let staticname = classnames('staticname')


        var rows = this.props.rowsperlane;

        if (rows === "2") {
            if (this.props.lane.lastname !== undefined) {
                swimmerName = this.props.lane.firstname + " " + this.props.lane.lastname
                spanName = <td>
                    <table>
                        <tbody>
                            <tr className={staticname}>
                                <td>
                                    {swimmerName.toString().substr(0, 30)}
                                </td>
                            </tr>
                            <tr className={staticclub}>
                                <td>{getBirthYear(this.props.lane.birthdate)} {this.props.lane.name.toString().substr(0, 50)}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                return spanName;
            } else if (this.props.lane.code !== undefined) {
                //Staffel
                swimmerName = this.props.lane.name
                spanName = <td>
                    <table>
                        <tbody>
                            <tr className={staticname}>
                                <td>
                                    {swimmerName.toString().substr(0, 30)}
                                </td>
                            </tr>
                            <tr className={staticclub}>
                                <td>{getBirthYear(this.props.lane.birthdate)} {this.props.lane.name.toString().substr(0, 50)}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                return spanName;
            }
        } else {
            if (this.props.lane.lastname !== undefined) {
                swimmerName = this.props.lane.firstname + " " + this.props.lane.lastname
                spanName = <td className={staticname}>{swimmerName}</td>
                return spanName;
            }
        }

        let staticemptylane = classnames('staticemptylane')
        spanName = <td className={staticemptylane}>{swimmerName}</td>
        return spanName;
    }

    render() {

        let laneclass = classnames('staticlaneodd')
        let staticlane_time = classnames('staticlane_time')

        let staticplace = classnames('staticplace')


        if (this.isEven(this.props.lane.lane)) {
            laneclass = classnames('staticlaneeven');
        }

        var { place } = ""
        //&& this.props.lane.place !== null
        if (this.props.lane.place !== 'undefined') {
            if (this.props.lane.place === "0") {
                place = "-"
            } else {
                place = this.props.lane.place
            }
        } else {
            place = ""
        }

        var { time } = ""
        if (this.props.lane.time !== 'undefined') {
            time = this.props.lane.time
        } else {
            time = ""
        }

        return (
            <tr key={this.props.lane.lane} className={laneclass}>
                <td className={staticplace}>{this.props.lane.lane}</td>
                <td className={staticplace}>{place}</td>
                {this.getSwimmerName()}
                <td className={staticlane_time}>{time}</td>
            </tr>
        )
    }
};

export default StaticLane