import React from 'react'
import Header from "./header"
import Static from "./static"
import classnames from 'classnames'

class Event extends React.Component {

    constructor(props) {
        super(props);
        console.log("Event Service rendered")
    }

    render() {

        let cssclasses = classnames('headername');

        var { fullscreen } = "";
        if (this.props.fullscreen !== true) {
            fullscreen = <button className={cssclasses} onClick={this.handleToggle}>Full {this.props.webtype}</button>
        }

        var { webcontent } = "";

        if (this.props.webtype === 'static') {
            webcontent = <Static
                lanes={this.props.lanes}
                info={this.props.info}
                time={this.props.time}
                responsestate={this.props.responsestate}
            />
        } else {
            webcontent = <Header
                lanes={this.props.lanes}
                info={this.props.info}
                time={this.props.time}
                responsestate={this.props.responsestate}
            />
        }

        return (
            <div>
                {fullscreen}
                {webcontent}
            </div>
        );
    }
};

export default Event
