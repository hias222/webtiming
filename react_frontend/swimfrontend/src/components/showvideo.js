import React from 'react'
import Grid from '@material-ui/core/Grid';


//import Image from '../water2.jpg';
import Video from './video';



class Showvideo extends React.Component {
    constructor(props) {
        super(props);
        console.log("Message Services init " + this.props.unixcompetitiontime + " " + this.props.type)
    }

    render() {
        return (
            <div >
                <Grid>
                    <Video></Video>
                </Grid>
            </div>
        )
    }
};

export default Showvideo