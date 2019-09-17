import React from 'react'


class VideoInformation extends React.Component {
    //const Service = ({ service }) => {

    render() {
        var videoname = this.props.name;
        return (
            <div>
                <p>
                   {videoname} 
                </p>
            </div>
            
        )
    }
};

export default VideoInformation