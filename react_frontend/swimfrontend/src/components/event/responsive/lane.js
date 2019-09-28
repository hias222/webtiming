import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import PoolIcon from '@material-ui/icons/Pool';
import classnames from 'classnames';

import NumberCellComponent from '../../../styles/NumberCellComponent';
import TextCellComponent from '../../../styles/TextCellComponent';
import TimeCellComponent from '../../../styles/TimeCellComponent';

class Lane extends React.Component {
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
        var { myicon } = ""
        //&& this.props.lane.place !== null
        if (this.props.lane.place !== 'undefined') {
            if (this.props.lane.place === "0") {
                myicon = <PoolIcon />
            } else {
                myicon = this.props.lane.place
            }
        } else {
            myicon = "-"
        }

        var { time } = ""
        if (this.props.lane.time !== 'undefined') {
            time = this.props.lane.time
        } else {
            time = ""
        }

        return (
            <TableRow className={laneclass} key={this.props.lane.lane}>
                <NumberCellComponent>{this.props.lane.lane}</NumberCellComponent>
                <NumberCellComponent>{myicon}</NumberCellComponent>
                <TextCellComponent >
                <span >
                    {this.props.lane.firstname} {this.props.lane.lastname} <span className={laneclub}>{this.props.lane.name}
                    </span>
                    </span>
                </TextCellComponent>
                <TimeCellComponent>
                <span >
                    {time}
                    </span>
                </TimeCellComponent>
            </TableRow>

        )
    }
};

export default Lane