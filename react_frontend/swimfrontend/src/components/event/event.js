import React from 'react'
import Header from "./header"
import Static from "./static"
import classnames from 'classnames'

class Event extends React.Component {

    constructor(props) {
        super(props);
        console.log("Event Service rendered")
    }

    handleToggle = (e) => {
        const el = document.documentElement
        if (el.requestFullscreen) {
          el.requestFullscreen()
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen()
        }
        this.setState({
          fullscreen: true
        })
      }

    render() {

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
                {webcontent}
            </div>
        );
    }
};

export default Event
