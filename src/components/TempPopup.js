import React, { Component } from 'react';

export default class TempPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expired: false,
        };
    };

    render() {
        const {show, backgroundColor = "white", color = "black", children} = this.props;
        console.log(this.state.expired);
        let body = (<span></span>);

        if(show && !this.state.expired) {
            setTimeout(() => { // TODO Setting state within render seems a bit fishy
                console.log("SETTING EXPIRED");
                this.setState({
                    expired: true,
                });
            }, this.props.duration);

            body = (
                <div style={{
                    position: "fixed",
                    top: 50,
                    zIndex: 100,
                    width: "100%"
                }}>
                    <div className="p4 rounded" style={{
                        width: "400px",
                        margin: "0 auto",
                        backgroundColor,
                        color,
                        boxShadow: "0px 2px 5px 1px rgba(0, 0, 0, 0.75)",
                        fontFamily: "'Source Code Pro', Helvetica, Arial, Sans-Serif",
                    }}
                    >{ children }</div>
                </div>
            )
        }

        return body;
    };
}