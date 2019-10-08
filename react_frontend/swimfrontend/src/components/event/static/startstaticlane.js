import React from 'react'

import getBirthYear from '../../getBirthYear'
import getEntryTime from '../../getEntryTime'

import classnames from 'classnames';



class StartStaticLane extends React.Component {
    //const Service = ({ service }) => {

    isEven(n) {
        return n % 2 === 0;
    }

    getSwimmerName() {
        var swimmerName = "keine Belegung"
        var spanName = ""

        let staticclub = classnames('staticclub')
        let staticname = classnames('staticname')
        //let startstaticlane_time = classnames('startstaticlane_time')
        let internaltable = classnames('internaltable')

        var rows = this.props.rowsperlane;

        if (rows === "2") {
            if (this.props.lane.lastname !== undefined) {
                swimmerName = this.props.lane.firstname + " " + this.props.lane.lastname
                spanName = <td>
                    <table width='100%' className={internaltable}>
                        <tbody>
                            <tr className={staticname}>
                                <td>
                                    {swimmerName.toString().substr(0, 40)}
                                </td>
                            </tr>
                            <tr><td>
                                <table width='100%' className={internaltable}>
                                    <tbody>
                                        <tr className={staticclub}>
                                            <td>
                                                {getBirthYear(this.props.lane.birthdate)} {this.props.lane.name}
                                                &nbsp; {getEntryTime(this.props.lane.entrytime)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
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

        let laneclass = classnames('startstaticlaneodd')
        let staticplace = classnames('staticplace')
        //let staticlane_time = classnames('staticlane_time')



        if (this.isEven(this.props.lane.lane)) {
            laneclass = classnames('startstaticlaneeven');
        }

        return (

            <tr key={this.props.lane.lane} className={laneclass}>
                <td className={staticplace}>{this.props.lane.lane}</td>
                {this.getSwimmerName()}
            </tr>

        )
    }
};

export default StartStaticLane