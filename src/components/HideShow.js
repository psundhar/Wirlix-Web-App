import React, { Component } from 'react';

export default class HideShow extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {show, backgroundColor = "black", color = "white", children} = this.props;

        let body = (<span></span>);

        

            body = (
                
                    <div className="p3 rounded" style={{
                        width: "400px",
                        margin: "0 auto",
                        backgroundColor,
                        color,
                        boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.4)",
                        fontFamily: "'Source Code Pro', Helvetica, Arial, Sans-Serif",
                    }}
                    >{ children }</div>
               
            )
        

        return body;
    };
}