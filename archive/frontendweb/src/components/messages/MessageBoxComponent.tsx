import React from "react";
import { Grid } from "@material-ui/core";
import classnames from 'classnames';
import BoardClock from "../clock/BoardClock";

export interface MessageBox {
    MessageText: string;
    MessageTime: string;
}

export type MessageState = {
    Message: string;
    MessageTime: string;
}

export class MessageBoxComponent extends React.Component<MessageBox, MessageState>{

    constructor(props: MessageBox) {
        super(props)
        this.state = {
            Message: this.props.MessageText,
            MessageTime: this.props.MessageText
        }
    }

    componentDidUpdate(prevProps: MessageBox) {
        if (prevProps !== this.props) {
            this.setState({ Message: this.props.MessageText })
            this.setState({ MessageTime: this.props.MessageTime })
        }
    }

    splitMessageLines() {
        var webcontent;
        let messageTextClass = classnames('messagetext');

        var strmessage = this.state.Message.toString();
        var lines = strmessage.split('\\n');
        webcontent = <Grid container className={messageTextClass}>
            {lines.map((msg, index) => (
                <Grid item xs={12}>
                    {msg}
                </Grid>
            ))}
        </Grid>
        return webcontent;

    }

    render() {
        return (
            <div>
                {this.splitMessageLines()}
                <BoardClock 
                type={"123"}
                unixcompetitiontime={this.state.MessageTime}
                />
            </div>
        )
    }
}