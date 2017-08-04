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

        let body = (<span></span>);

        if(show && !this.state.expired) {
            setTimeout(() => { // TODO Setting state within render seems a bit fishy

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
                    <div className="p3 rounded" style={{
                        width: "400px",
                        margin: "0 auto",
                        backgroundColor,
                        color,
                        boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.4)",
                        fontFamily: "'Source Code Pro', Helvetica, Arial, Sans-Serif",
                    }}
                    >{ children }</div>
                </div>
            )
        }

        return body;
    };
}