import React from 'react'


class VideoInformation extends React.Component {
    //const Service = ({ service }) => {

    render() {
        var videoname = this.props.name;


        return (
            <div>
               
                <div>
                    <p>
                        {videoname}
                    </p>
                </div>
            </div>

        )
    }
};

export default VideoInformation