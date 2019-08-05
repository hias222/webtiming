import React from 'react'

class Lane extends React.Component {
    //const Service = ({ service }) => {
    render() {
        return (
            <tr>
                <td>1</td>
                <td>{this.props.lane.lane}</td>
                <td>{this.props.lane.firstname} {this.props.lane.lastname} ( {this.props.lane.name})</td>
                <td>
                   123
                </td>
            </tr>
        )
    }
};

export default Lane