import React from 'react'
import { Row, Col, Table } from 'react-materialize';
import Lane from './lane';
class Header extends React.Component {

    constructor(props) {
        super(props);
        console.log("Header Services init")
    }

    componentDidUpdate() {
        console.log("new data " + JSON.stringify(this.props.lanes));
    }

    //const Services = ({ services }) => {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h2>
                            {this.props.info.competition}<br></br>
                            {this.props.info.distance}m {this.props.info.swimstyle}
                            <br></br>
                            Wettkampf: {this.props.info.event} Lauf: {this.props.info.heat}
                        </h2>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th data-field="Bahn">
                                        Platz
</th>
                                    <th data-field="Bahn">
                                        Bahn
</th>
                                    <th data-field="name">
                                        Name
</th>
                                    <th data-field="time">
                                        Time
</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.lanes.map((lane, index) => (
                                    <Lane lane={lane} key={index} />
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
};

export default Header
