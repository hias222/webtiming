import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import classnames from 'classnames';

import getBirthYear from '../../getBirthYear'
import getEntryTime from '../../getEntryTime'

import NumberCellComponent from '../../../styles/NumberCellComponent';
import TextCellComponent from '../../../styles/TextCellComponent';
//import TimeCellComponent from '../../../styles/TimeCellComponent';

class StartLane extends React.Component {
    //const Service = ({ service }) => {
    isEven(n) {
        return n % 2 === 0;
    }

    render() {
        let laneclass = classnames('laneodd')

        if (this.isEven(this.props.lane.lane)) {
            laneclass = classnames('laneeven');
        }

        let laneclub = classnames('laneclub')

        return (
            <TableRow className={laneclass} key={this.props.lane.lane}>
                <NumberCellComponent>{this.props.lane.lane}</NumberCellComponent>
                <TextCellComponent >
                    <span >
                        {this.props.lane.firstname} {this.props.lane.lastname} 
                        <span className={laneclub}>
                        &nbsp; {getBirthYear(this.props.lane.birthdate)}
                        &nbsp; {this.props.lane.name}
                        &nbsp; ({getEntryTime(this.props.lane.entrytime)})
                    </span>
                    </span>
                </TextCellComponent>
            </TableRow>

        )
    }
};

export default StartLane