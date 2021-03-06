import React from 'react'
import Showmessage from "./responsive/showmessage"
import Staticmessage from "./static/staticmessage"

class Message extends React.Component {

  constructor(props) {
    super(props);
    console.log("Event Service rendered ")
    this.state = {
      webtype: "",
      fullscreen: false,
      displaymode: ""
    };
  }

  accessMode = {
    DISPLAY: "static",
    WEB: "responsive"
  };

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

  setWebmode() {
    var title_theme = typeof (process.env.REACT_APP_DISPLAY_MODE) != 'undefined' ? process.env.REACT_APP_DISPLAY_MODE : "responsive"
    if (this.props.webtype !== 'normal') {
      console.log("mode set " + this.props.webtype)
      this.setState({
        webtype: this.props.webtype,
        displaymode: this.props.webtype
      })
    } else {
      this.setState({
        webtype: this.props.webtype,
        displaymode: title_theme
      })
    }
  }

  componentDidUpdate() {
    if (this.state.webtype !== this.props.webtype) {
      this.setWebmode();
    }
  }

  render() {

    var { webcontent } = "";

    if (Object.values(this.accessMode).includes(this.state.displaymode)) {

      if (this.state.displaymode === this.accessMode.WEB) {
        webcontent = <Showmessage
          unixcompetitiontime={this.props.unixcompetitiontime}
          type={this.props.type}
          info={this.props.info}
          message={this.props.message}
        />
      }

      if (this.state.displaymode === this.accessMode.DISPLAY) {
        webcontent = <Staticmessage
          unixcompetitiontime={this.props.unixcompetitiontime}
          type={this.props.type}
          info={this.props.info}
          message={this.props.message}
        />
      }
    } else {
      webcontent = <div>
        <p>wrong mode in env file check REACT_APP_DISPLAY_MODE or in url path</p>
        <p>{this.state.displaymode}</p>
        <p>{JSON.stringify(this.accessMode)}</p>
      </div>
    }

    return (
      <div>
        {webcontent}
      </div>
    );
  }
};

export default Message
