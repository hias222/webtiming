import React from 'react';
import classnames from 'classnames';

interface LaneNumberInterface {
    laneNumber: string;
}

export default class LaneNumber extends React.Component<LaneNumberInterface, {}> {

    render() {
        let textlanesvg = classnames('textlanesvg');
        let gradient_lane = classnames('gradient_lane');

        return (<svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
            id="svg8"
            version="1.1"
            viewBox="0 0 15.874996 12.7"
            height="48"
            width="60">
            <defs>
                <linearGradient id="laneNumberGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_lane}
                        offset="0"
                        stopOpacity="1"
                    />
                    <stop
                        className={gradient_lane}
                        offset="1"
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="2"
                    x2="50"
                    y1="-10"
                    x1="20"
                    id="laneGradientStyle"
                    xlinkHref="#laneNumberGradient"
                />
            </defs>
            <g
                id="layer1">
                <path
                    transform="scale(0.26458333)"
                    //d="M 0,50 0,47 0,24 0,0 30,0 c 15,0 29,0.0 29,0 l 0.50,0 -12,23 -12,23 -10,0 c -5,0 -13,0 -17,0 z"
                    d="M 0 3 h 60 l -30,35 h -30  z"
                    fill="url(#laneGradientStyle)"
                />
                <text
                    className={textlanesvg}
                    y="8"
                    x="1"
                    fontSize="9"
                >
                    {this.props.laneNumber}</text>
            </g>
        </svg>
        );
    }
} 