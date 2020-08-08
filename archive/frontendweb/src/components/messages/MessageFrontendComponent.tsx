import React from "react";
import { MessageInterface } from "../../interfaces/MessageInterface";
import { VideoFrontendComponent } from "./VideoFrontendComponent";
import BoardClock from "../clock/BoardClock";
import { MessageBoxComponent } from "./MessageBoxComponent";

export type MessageType = {
    displayMode: string;
    Message: string;
}

export class MessageFrontendComponent extends React.Component<MessageInterface, MessageType> {

    constructor(props: MessageInterface) {
        super(props)
        this.state = {
            displayMode: this.props.diplayMode,
            Message: this.props.MessageText
        }
    }

    setFrontend(displayMode: string) {
        this.setState({
            displayMode: displayMode
        })
    }

    getVideoUrl() {
        if (this.props.VideoVersion === "1") {
            return "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        }
        if (this.props.VideoVersion === "2") {
            return "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
        if (this.props.VideoVersion === "3") {
            return "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
        }

        if (this.props.VideoVersion === "4") {
            return "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
        }

        if (this.props.VideoVersion === "5") {
            return "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
        }
        console.log("not found video " + this.props.VideoVersion)
        return ""
    }

    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
    getFrontend() {
        switch (this.state.displayMode) {
            case "video":
                switch (this.props.displayFormat) {
                    case "fixed":

                        return <VideoFrontendComponent
                            videoURL={this.getVideoUrl()}
                            height="382"
                            width="510"
                        />
                    default:
                        return <VideoFrontendComponent
                            videoURL={this.getVideoUrl()}
                            height="100%"
                            width="100%"
                        />
                }
            case "message":
                return <MessageBoxComponent
                    MessageText={this.props.MessageText}
                    MessageTime={this.props.MessageTime} />
            case "clock":
                return <BoardClock
                    type="123"
                    unixcompetitiontime={this.props.MessageTime}
                />
            default:
                return <h1>not defined - this.state.displayMode</h1>
        }
    }

    componentDidUpdate(prevProps: MessageInterface) {
        if (prevProps.diplayMode !== this.props.diplayMode) {
            console.log("update diplayMode " + this.props.diplayMode)
            this.setFrontend(this.props.diplayMode)
            return
        }
    }

    render() {
        return this.getFrontend()
    }
}
