import React from "react";

import classnames from 'classnames';
import VideoInformation from './video/videoinformation'

//import { Player } from 'video-react';

class Video extends React.Component {
    constructor(props) {
        super(props);
        //var videolink = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_01 : process.env.REACT_APP_VIDEO_01_FULL;
        //this.state = {
        //    videolink: videolink
        //}
        this.setVideoLink = this.setVideoLink.bind(this)
        switch (this.props.version) {
            case "1":
                var videolink1 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_01 : process.env.REACT_APP_VIDEO_01_FULL;
                this.state = {
                    videolink: videolink1
                }
                console.log("version eins")
                break;
            case "2":
                var videolink2 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_02 : process.env.REACT_APP_VIDEO_02_FULL;
                this.state = {
                    videolink: videolink2
                }
                console.log("version zwei")
                break;
            case "3":
                var videolink3 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_03 : process.env.REACT_APP_VIDEO_03_FULL;
                this.state = {
                    videolink: videolink3
                }
                console.log("version drei")
                break;
            case "4":
                var videolink4 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_04 : process.env.REACT_APP_VIDEO_04_FULL;
                this.state = {
                    videolink: videolink4
                }
                console.log("version vier")
                break;
            case "5":
                var videolink5 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_05 : process.env.REACT_APP_VIDEO_05_FULL;
                this.state = {
                    videolink: videolink5
                }
                console.log("version fünf")
                break;
            default:
                var videolink = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_01 : process.env.REACT_APP_VIDEO_01_FULL;
                console.log("version def")
                this.state = {
                    videolink: videolink
                }
        }
        //var version = this.props.version

    }

    setVideoLink() {
        switch (this.props.version) {
            case "1":
                var videolink1 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_01 : process.env.REACT_APP_VIDEO_01_FULL;
                this.setState = {
                    videolink: videolink1
                }
                console.log("version eins")
                break;
            case "2":
                var videolink2 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_02 : process.env.REACT_APP_VIDEO_02_FULL;
                this.setState = {
                    videolink: videolink2
                }
                console.log("version zwei")
                break;
            case "3":
                var videolink3 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_03 : process.env.REACT_APP_VIDEO_03_FULL;
                this.setState = {
                    videolink: videolink3
                }
                console.log("version drei")
                break;
            case "4":
                var videolink4 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_04 : process.env.REACT_APP_VIDEO_04_FULL;
                this.setState = {
                    videolink: videolink4
                }
                console.log("version vier")
                break;
            case "5":
                var videolink5 = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_05 : process.env.REACT_APP_VIDEO_05_FULL;
                this.setState = {
                    videolink: videolink5
                }
                console.log("version fünf")
                break;
            default:
                var videolink = process.env.REACT_APP_BACKEND_VIDEO_DIRECT === "true" ? "http://" + window.location.hostname + ":" + window.location.port + "/" + process.env.REACT_APP_VIDEO_01 : process.env.REACT_APP_VIDEO_01_FULL;
                console.log("version def")
                this.setState = {
                    videolink: videolink
                }
        }
        this.playVideo()
    }

    componentDidMount = () => {
        this.playVideo();
    };

    componentDidUpdate = () => {
        this.setVideoLink(); 
    }

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
        let staticemptytable = classnames('staticemptytable');
        let videotable = classnames('videotable');

        return (
            <div>
                <div>
                    <table height={process.env.REACT_APP_PIXEL_FROM_TOP} className={staticemptytable} >
                        <tbody>
                            <tr><td>
                                <VideoInformation
                                    name={this.state.videolink}
                                /></td>
                                <td>
                                    <button onClick={this.playVideo}>
                                        Play!
                                    </button>
                                    <button onClick={this.pauseVideo}>
                                        Pause!
                                     </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className={videotable}>
                        <tbody>
                            <tr>
                                <td padding="0">
                                    <video
                                        loop={true}
                                        height="382"
                                        width="510"
                                        ref="vidRef"
                                        src={this.state.videolink}
                                        type="video/mp4"
                                        autoPlay={true}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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

          <video
                                            ref="vidRef"
                                            src={this.state.videolink}
                                            type="video/mp4"
                                        />

                                        <Player
                                            playsInline
                                            poster="/assets/poster.png"
                                            src={this.state.videolink}
                                        />
        */