import * as React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
    event_type: string;
}

interface State {
    event_type: string;
};

// FINALE: 'FIN',
// VORLAEUFE: 'PRE',
// DIREKT: 'TIM'


export default class SendDatamapping extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            event_type: ""
        };
        //this.getStateDatamapping = this.getStateDatamapping.bind(this);
    }

    private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? "http://" + window.location.hostname + ":3001/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/" + process.env.REACT_APP_DATAMAPPING_MQQT_REST_PATH

    sendFinal = (message: string) => (event: any) => {
        console.log(this.backendConnect + " " + message)
        fetch(this.backendConnect, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "message": "configuration event_type " + message
            })
        })
            .then(() => this.getStateDatamapping())
            .catch(console.log)
    };

    private backendConfig = process.env.REACT_APP_DATAMAPPING_DIRECT === "true" ? "http://" + window.location.hostname + ":3001" : process.env.REACT_APP_DATAMAPPING_URL;

    getStateDatamapping() {
        fetch(this.backendConfig + "/configuration")
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    event_type: data.event_type
                })
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
                <Button variant="contained" color="default" onClick={this.sendFinal("ALL")}>ALL
            </Button>
                <Button variant="contained" color="default" onClick={this.sendFinal("FIN")}>Finale
            </Button>
                <Button variant="contained" color="default" onClick={this.sendFinal("PRE")}>Vorläufe
            </Button>
                <Button variant="contained" color="default" onClick={this.sendFinal("TIM")}>Normal
            </Button>
            <p>Type on backend: {this.state.event_type}</p>
            </div>
        )
    };

};