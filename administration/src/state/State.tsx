import React from 'react';
import './State.css';
import Navigation from '../common/Navigation';
import DatamappingInfo from '../components/DatamappingInfo';

interface Props { }

interface State {
  count: number;
  event_type: string;
  lenex_startlist: string;
};

export default class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      event_type: "",
      lenex_startlist: "",
      count: 0
    };

    this.getStateDatamapping = this.getStateDatamapping.bind(this);
    
  }

  private backendConnect = process.env.REACT_APP_DATAMAPPING_DIRECT === "true" ? "http://" + window.location.hostname + ":3001" : process.env.REACT_APP_DATAMAPPING_URL;

  getStateDatamapping() {
    fetch(this.backendConnect + "/configuration")
      .then(res => res.json())
      .then((data) => {
        this.setState({ 
          event_type: data.event_type,
          lenex_startlist: data.lenex_startlist })
      })
      .catch(console.log)

      console.log("update from " + this.backendConnect)
  }


  componentDidMount() {
    this.getStateDatamapping()
    }

  
  render() {
    return (
      <div>
        <Navigation />
        <button onClick={this.getStateDatamapping}>Update</button>
        <DatamappingInfo 
        event_type={this.state.event_type} 
        lenex_startlist= {this.state.lenex_startlist}/>       
      </div>
    );
  }
}