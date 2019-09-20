import * as React from 'react';

interface Props {
    event_type: string;
    lenex_startlist: string;
}

interface State {
    event_type: string;
    lenex_startlist: string;
};


export default class SendDatamapping extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            event_type: "",
            lenex_startlist: ""
        };

        //this.getStateDatamapping = this.getStateDatamapping.bind(this);

    }

    private backendConnect: string = "hello"

    sendAction = (message: string) => (event: any) => {
        console.log(this.backendConnect + " " + message)
        fetch(this.backendConnect, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "message": message
            })
        })
            .catch(console.log)
    };

    render() {
        return (
            <div>
                <p>HEllo World</p>
            </div>
        )
    };

};