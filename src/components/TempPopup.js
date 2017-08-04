import React, { Component } from 'react';

export default class TempPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };

    render() {
        const {show, backgroundColor = "white", duration} = this.props;

        let body = (<span></span>);

        if(show) {
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
                        boxShadow: "0px 2px 5px 1px rgba(0, 0, 0, 0.75)",
                        border: "3px solid darken(backgroundColor, 10%)",
                    }}
                    >Popup</div>
                </div>
            )
        }

        return body;
    };
}