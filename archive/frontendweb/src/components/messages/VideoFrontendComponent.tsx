import React from "react";

import classnames from 'classnames';

export interface VideoInterface {
    videoURL: string;
    width: string;
    height: string;
}

export class VideoFrontendComponent extends React.Component<VideoInterface, {}> {

    render() {
        let videotable = classnames('videotable-variable');

        return (
            < video className={videotable}
                loop={true}
                height={this.props.height}
                width={this.props.width}
                ref="vidRef"
                src={this.props.videoURL}
                autoPlay={true}
            />
        )
    }
}