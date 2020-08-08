import React from 'react';
import classnames from 'classnames';

interface LaneNumberFinishInterface {
    laneNumber: string;
    place?: string;
}

export default class LaneNumberFinish extends React.Component<LaneNumberFinishInterface, {}> {

    getLaneSVG() {
        let textlanesvg = classnames('textlanesvg');
        let gradient_lane = classnames('gradient_lane');
        let boxlanesvg = classnames('boxlanesvg');

        return <svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"
            id="svg8"
            version="1.1"
            viewBox="0 0 15.874996 12.7"
            height="48"
            width="80">
            <defs>
                <linearGradient id="LaneNumberFinishLaneGradient" gradientTransform="rotate(0)">
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
                    id="laneNumberFinishLaneFill"
                    xlinkHref="#LaneNumberFinishLaneGradient"
                />
            </defs>
            <g
                id="layer1">
                <path
                    transform="scale(0.26458333)"
                    //d="M 0,50 0,47 0,24 0,0 30,0 c 15,0 29,0.0 29,0 l 0.50,0 -12,23 -12,23 -10,0 c -5,0 -13,0 -17,0 z"
                    d="M 0 3 h 60 l -30,35 h -30  z"
                    fill="url(#laneNumberFinishLaneFill)"
                    className={boxlanesvg}
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

    }

    getPlaceSVG() {
        let textlanesvg = classnames('textlanesvg');
        let gradient_lane = classnames('gradient_lane');
        let gradient_place = classnames('gradient_place');
        let textplacesvg = classnames('textplacesvg');

        return <svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"
            id="svg8"
            version="1.1"
            viewBox="0 0 15.874996 12.7"
            height="48"
            width="120">
            <defs>
                <pattern id="laneNumberFinishPlacePattern"
                    x="0" y="0" width="3" height="3"
                    patternUnits="userSpaceOnUse" >
                    <path
                        transform="scale(0.8)"
                        fill='#FFFF00'
                        fill-opacity='1'
                        d='M61.82 18c3.47-1.45 6.86-3.78 11.3-7.34C78 6.76 80.34 5.1 83.87 3.42 88.56 1.16 93.75 0 100 0v6.16C98.76 6.05 97.43 6 96 6c-9.59 0-14.23 2.23-23.13 9.34-1.28 1.03-2.39 1.9-3.4 2.66h-7.65zm-23.64 0H22.52c-1-.76-2.1-1.63-3.4-2.66C11.57 9.3 7.08 6.78 0 6.16V0c6.25 0 11.44 1.16 16.14 3.42 3.53 1.7 5.87 3.35 10.73 7.24 4.45 3.56 7.84 5.9 11.31 7.34zM61.82 0h7.66a39.57 39.57 0 0 1-7.34 4.58C57.44 6.84 52.25 8 46 8S34.56 6.84 29.86 4.58A39.57 39.57 0 0 1 22.52 0h15.66C41.65 1.44 45.21 2 50 2c4.8 0 8.35-.56 11.82-2z'
                    />
                </pattern>
                <linearGradient id="laneNumberFinishPlaceGradient" gradientTransform="rotate(0)">
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
                    id="laneNumberFinishPlaceFill"
                    xlinkHref="#laneNumberFinishPlaceGradient"
                />
                <linearGradient id="placeNumberFinishPlaceGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_place}
                        offset="0"
                        stopOpacity="1"
                    />
                    <stop
                        className={gradient_place}
                        offset="1"
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="2"
                    x2="100"
                    y1="-10"
                    x1="70"
                    id="placeNumberFinishPlaceFill"
                    xlinkHref="#placeNumberFinishPlaceGradient"
                />
                <linearGradient id="placeNumberFinishPlaceGradient1" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_place}
                        offset="0"
                        stopOpacity="1"
                    />
                    <stop
                        className={gradient_place}
                        offset="1"
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="-10"
                    x2="40"
                    y1="2"
                    x1="60"
                    id="placeNumberFinishPlaceFill1"
                    xlinkHref="#placeNumberFinishPlaceGradient1"
                />
            </defs>
            <g id="layer1">
                <path
                    transform="scale(0.26458333)"
                    d="M 0 3 h 60 l -30,35 h -30 z"
                    fill="url(#laneNumberFinishPlaceFill)"
                />
                <text
                    className={textlanesvg}
                    y="8"
                    x="1"
                    fontSize="9"
                >
                    {this.props.laneNumber} </text>
            </g>

            <g id="layerplace">
                <path
                    transform="scale(0.26)"
                    d="M 65 3 h 20 l -20,35 h -20 z"
                    fill="url(#placeNumberFinishPlaceFill)"
                />
                <path
                    transform="scale(0.26)"
                    d="M 50 3 h 15 l -20,35 h -15 z"
                    fill="url(#placeNumberFinishPlaceFill1)"
                />
                <text
                    className={textplacesvg}
                    y="8"
                    x="13"
                    fontSize="9"
                >
                    {this.props.place}</text>
            </g>
        </svg>
    }

    render() {
        if (this.props.place === null || typeof this.props.place === 'undefined' || this.props.place === '') {
            return (
                this.getLaneSVG()
            );
        }
        else {
            return (
                this.getPlaceSVG()
            );

        }

    }

}