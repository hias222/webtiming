import * as React from 'react';

interface Props {
    message: string;
}

const SendTimingRawCommand: React.FunctionComponent<Props> = (props) => {
    return <h1>{props.message}</h1>;
};

export default SendTimingRawCommand