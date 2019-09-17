import React from "react";

import VideoInformation from './video/videoinformation'

class Video extends React.Component {
    constructor() {
        super();
        var videolink = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + "/" + process.env.REACT_APP_VIDEO_01 : process.env.REACT_APP_VIDEO_01_FULL;
        this.state = {
            videolink: videolink
        }
    }

componentDidMount = () => {
    this.playVideo();
};

componentWillUnmount = () => {
    this.pauseVideo();
};

playVideo = () => {
    // You can use the play method as normal on your video ref
    var promise = document.querySelector('video').play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
            this.refs.vidRef.play();
            console.log("play " + this.state.videolink)
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
            console.log("no auto play " + this.state.videolink)
            alert("turn on sound in chrome -> autoplay should work")
        });
    }
    
    
};

pauseVideo = () => {
    // Pause as well
    this.refs.vidRef.pause();
};

render() {
    return (
        <div>
            <VideoInformation
                name={this.state.videolink}
            />
            <video
                ref="vidRef"
                src={this.state.videolink}
                type="video/mp4"
            />

        </div>
    );
};
}

export default Video;

/*

                */
//src="https://assets.polestar.com/video/test/polestar-1_09.mp4"
/*
<div>
                    <button onClick={this.playVideo}>
                        Play!
              </button>
                    <button onClick={this.pauseVideo}>
                        Pause!
              </button>
                </div>
                */