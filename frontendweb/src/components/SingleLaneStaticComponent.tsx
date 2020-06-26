import React from "react";

import { swimmerData } from "../types/SwimmerData";
import { LaneInterface } from "../interfaces/LaneInterface";
import { LaneState } from "../state/LaneState";

import checkUndefined from "../utilities/checkUndefined";
import getBirthYear from "../utilities/getBirthYear";
import stringToBoolean from "../utilities/stringToBoolean";
import StyledLane from "./images/StyledLane";
import LapStyledLane from "./images/LapStyledLane";
import FinishStyledLane from "./images/FinishStyledLane";

export class SingleLaneStaticComponent extends React.Component<LaneInterface, LaneState>{

  intervalId: NodeJS.Timeout;
  swimmer: swimmerData;

  constructor(props: LaneInterface) {
    super(props);

    this.swimmer = {
      name: "nn",
      clubid: "0",
      birthyear: "1900",
      clubname: "nn"
    }

    this.state = {
      lane: "",
      place: "",
      time: "",
      laptime: "",
      islaptime: false,
      changed: Date.now(),
      swimmerData: this.swimmer
    }

    this.updateData = this.updateData.bind(this)
    this.getRaceData = this.getRaceData.bind(this)
    this.laptimer = this.laptimer.bind(this)
    this.intervalId = setInterval(this.laptimer, 1000);
  }

  componentDidMount() {
    this.updateData();

  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate(prevProps: LaneInterface) {
    //console.log("update " + this.props.lane.lane)
    if (prevProps.lane !== this.props.lane) {
      //console.log("diff update " + this.props.displayMode + " " + JSON.stringify(this.props.lane))
      this.updateData()
    }
  }

  laptimer() {
    if (this.state.islaptime) {
      var changesinceseconds = Date.now() - this.state.changed
      //console.log("lap " + this.state.lane + " changed since " + changesinceseconds)
      if (changesinceseconds > 15000) {
        console.log("lap " + this.state.lane + " changed since " + changesinceseconds)
        this.setState({
          laptime: "",
          islaptime: false
        })
      }
    }
  }

  updateData() {
    if (this.props.lane.lastname !== undefined) {
      this.setState({
        swimmerData: {
          birthyear: getBirthYear(this.props.lane.birthdate),
          name: this.props.lane.lastname,
          firstName: this.props.lane.firstname,
          clubid: this.props.lane.code,
          clubname: this.props.lane.name,
        },
        lane: this.props.lane.lane,
        changed: Date.now(),
      })
    } else {
      this.setState({
        swimmerData: {
          birthyear: " ",
          name: " ",
          firstName: " ",
          clubid: "-",
          clubname: ""
        },
        lane: this.props.lane.lane,
        changed: Date.now(),
      })
    }

    if (this.props.lane.entrytime !== undefined) {
      this.setState({
        entrytime: this.props.lane.entrytime
      })
    }

    if (stringToBoolean(this.props.lane.lap)) {
      this.setState({
        islaptime: true,
        laptime: checkUndefined(this.props.lane.finishtime),
      })
    } else {
      this.setState({
        islaptime: false,
        place: checkUndefined(this.props.lane.place),
        time: checkUndefined(this.props.lane.finishtime),
      })
    }

  }

  getData() {
    switch (this.props.displayMode) {
      case "startlist":
        return <StyledLane
          swimmer={this.state.swimmerData}
          lane={this.state.lane}
          entrytime={this.state.entrytime}
        />
      case "race":
        return this.getRaceData()
      default:
        return <p>no displaymode</p>
    }
  }
  //paste in state

  getRaceData() {

    if (this.state.islaptime) {
      return <LapStyledLane
        swimmer={this.state.swimmerData}
        lane={this.state.lane}
        finishtime={this.state.laptime}
      />
    } else {
      return <FinishStyledLane
        swimmer={this.state.swimmerData}
        lane={this.state.lane}
        place={this.state.place}
        finishtime={this.state.time}
      />
    }

  }

  render() {
    return (
      this.getData()
    )
  }

}