import React from 'react';

const DebateModal = ({debate}) => {
    return (
        <div id="view-debate" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="chat-header col-md-12">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="user-img">
                                <p><a href="profile.html"
                                      style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                </p>
                                <p>Username</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="user-img">
                                <p><a href="profile.html"
                                      style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                </p>
                                <p>Username</p>
                            </div>
                        </div>
                        <div className="vote-bar">
                            <div className="vote-amt">
                                <p><img src="/images/eye-b.png"/> 200</p>
                            </div>
                            <div className="vote-amt">
                                <p><img src="/images/check-mark-b.png"/> 278</p>
                            </div>
                        </div>
                    </div>
                    <div className="chat-box">
                        <div className="message-box dis-message">
                            <div className="username">
                                <p><a href="profile.html"
                                      style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                </p>
                            </div>
                            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse varius egestas lacinia. </p>
                            <p className="time-posted">25m</p>
                        </div>
                        <div className="message-box agr-message">
                            <div className="username">
                                <p><a href="profile.html"
                                      style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                </p>
                            </div>
                            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse varius egestas lacinia. </p>
                            <p className="time-posted">25m</p>
                        </div>
                        <div className="message-box dis-message">
                            <div className="username">
                                <p><a href="profile.html"
                                      style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                </p>
                            </div>
                            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse varius egestas lacinia. </p>
                            <p className="time-posted">25m</p>
                        </div>
                        <div className="message-box agr-message">
                            <div className="username">
                                <p><a href="profile.html"
                                      style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                </p>
                            </div>
                            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse varius egestas lacinia. </p>
                            <p className="time-posted">25m</p>
                        </div>
                        <div className="message-box dis-message">
                            <div className="username">
                                <p><a href="profile.html"
                                      style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                </p>
                            </div>
                            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse varius egestas lacinia. </p>
                            <p className="time-posted">25m</p>
                        </div>
                    </div>
                    <div className="vote-box col-md-12">
                        <div className="col-md-6 col-md-offset-3">
                            <p><i className="fa fa-check"/> Subscribe</p>
                        </div>
                    </div>
                    <div className="close-bottom">
                        <button type="button" className="btn btn-default" data-dismiss="modal"><i
                            className="fa fa-times-circle" aria-hidden="true"/></button>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default DebateModal;
