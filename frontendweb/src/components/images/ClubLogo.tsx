import React from "react";
import Img from 'react-image'

interface clublogoInterface {
    clubId: string;
}

export default class ClubLogo extends React.Component<clublogoInterface, {}> {

    // https://onlinepngtools.com/create-transparent-png

    render() {
        let logoUrl = "http://" + window.location.hostname + ":" + window.location.port + "/logos/"

        console.log(logoUrl +  this.props.clubId + ".png")
            
        return <Img height={40} src={[logoUrl +
            this.props.clubId + ".png", logoUrl + "ger.png"]}>
        </Img>;
    }
}
