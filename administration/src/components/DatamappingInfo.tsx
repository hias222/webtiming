import * as React from 'react';

interface Props {
    event_type: string;
    lenex_startlist: string;
}

const DatamappingInfo: React.FunctionComponent<Props> = (props) => {
    var returnvalue = <div>
        <h1>{props.event_type}</h1>
        <p>{props.lenex_startlist}</p>
        </div>

    return returnvalue;
};

export default DatamappingInfo