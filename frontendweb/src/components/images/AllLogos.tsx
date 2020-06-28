import React from 'react';
import logog_5147 from './data/5147.png'
import logog_6524 from './data/6524.png'
import logog_6621 from './data/6621.png'
import ger from './data/ger.png'


interface AllLogoInterface {
    clubId: string;
    name: string;
}

export default class AllLogos extends React.Component<AllLogoInterface, {}> {

    switchImage() {

        switch (this.props.clubId) {
            case ("5147"):
                return <img src={logog_5147} height="40" alt={this.props.name}/>
            case ("6524"):
                return <img src={logog_6524} height="40" alt={this.props.name} />
            case ("6621"):
                return <img src={logog_6621} height="40" alt={this.props.name}/>
            case ("0"):
                return <img src={ger} height="40" alt={this.props.name}/>
            default:
                return <div>{this.props.name}</div>
        }
    }

    render() {
        return (
            <div className="logo">
                {this.switchImage()}
            </div>
        );
    }
} 