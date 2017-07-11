import React from 'react';

const FlippableDebateCard = React.createClass({
    getInitialState() {
        return {
            frontVisible: true,
        }
    },

    flip() {
        this.setState({
           frontVisible: !this.state.frontVisible,
        });
    },

    render() {
        const { challenger, challengee, views, subscribers, subscribed } = this.props;

        const frontVisible = this.state.frontVisible;

        return (
            <div className="debate" onClick={ this.flip }>
                { frontVisible && (<div className="front">
                    <div className="content">
                        <div className="flex justify-between">
                            <div>
                                <input type="checkbox" checked={ subscribed }/>
                            </div>
                            <div className="flex justify-around">
                                <div className="flex flex-column" style={{width: "40%"}}>
                                    <div className="mx-auto" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat", borderRadius:"100px", border: "2px white solid", width: "50px", height: "50px"}}></div>
                                    <p className="small">{ challenger.username }</p>
                                </div>
                                <div className="vs">
                                    <p>vs.</p>
                                </div>
                                <div className="flex flex-column" style={{width: "40%"}}>
                                    <div className="mx-auto" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat", borderRadius:"100px", border: "2px white solid", width: "50px", height: "50px"}}></div>
                                    <p className="small">{ challengee.username }</p>
                                </div>
                            </div>
                            <span className="small">25m</span>
                        </div>
                    </div>
                    <div className="clearfix mb3">
                        <div className="col-md-6">
                            <p className="view-amt"><img src="images/eye-w.png" style={{margin: "0px"}} /> { views }</p>
                        </div>
                        <div className="col-md-6">
                            <p className="view-amt"><img src="images/check-mark.png" style={{margin: "0px"}} /> { subscribers.length }</p>
                        </div>
                    </div>
                </div>) }
                { !frontVisible && (
                    <div className="back">
                        <div className="username">
                            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a> { challengee.username }</p>
                        </div>
                        <p className="comment-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
                        <p><button type="button" className="full-debate" href="#" data-toggle="modal" data-target="#view-debate">Full Debate &#8250;</button></p>
                    </div>
                )}

            </div>
        );
    },
});

export default FlippableDebateCard;