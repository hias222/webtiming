import React from 'react'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
//import Iframe from 'react-iframe'


import { styled } from '@material-ui/styles';

import classnames from 'classnames';
import Image from '../water2.jpg';

const MyPaper = styled(Paper)({
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `calc(100vw-100)`,
    margin: 10,
    padding: 0,
});


class Showmessage extends React.Component {

    constructor(props) {
        super(props);
        console.log("Header Services init")
    }


    format(ms) {
        var minutes = Math.floor(ms / (1000 * 60)),
            seconds = Math.floor((ms - minutes * 1000 * 60) / 1000),
            fract = Math.floor((ms - minutes * 1000 * 60 - seconds * 1000) / 100);

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ',' + fract;
    }

    render() {

       
        let heatclass = classnames('heatheader');

        return (
            <div >
                <Box component="span" m={1} color="text.primary">
                    <Container maxWidth="md">
                        <MyPaper >
                            <Grid >
                                <div className={heatclass}>
                                    {this.props.info.competition}
                                </div>
                            </Grid>
                        </MyPaper>
                    </Container>
                </Box>

            </div>
        )
    }
};

export default Showmessage

/*

                        <Iframe url="https://swimtiming.azurewebsites.net"
                            width="100%"
                            height="600px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                        />
                        */