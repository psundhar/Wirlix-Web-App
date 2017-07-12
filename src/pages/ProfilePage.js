import React from 'react';
import FlippableDebateCard from '../components/FlippableDebateCard';
import NavBar from '../components/NavBar';

const ProfilePage = React.createClass({

    getInitialState() {
        return {
            user: {},
            debates: [],
            statement: {},
        };
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }
    },

    render() {
        const { user, statement, debates } = this.state;
        return (
            <div>
                <div className="main-content profile">
                    <NavBar user={user}/>
                    <section className="profile-container">
                        <div className="container">
                            <div className="profile-pic col-md-4 col-md-offset-4">
                                <div className="pic-crop"
                                     style={{background: "url('/images/pexels-photo-103123.jpeg') center center no-repeat;"}}></div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="profile-content col-md-8 col-md-offset-2">
                                <h2 className="profile-name">{ user.username }</h2>
                                <div className="scores">
                                    <div className="col-md-6">
                                        <p><img src="/images/best-debater-w.png"/> { statement.rational }</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><img src="/images/peace.png" className="peace"/> { statement.emotional }</p>
                                    </div>
                                </div>
                                <div className="qotd col-md-10 col-md-offset-1">
                                    <div className="gotd-banner">
                                        <h3 className="mb2">{ statement.topic ? statement.topic.prompt : '' }</h3>
                                        <div style={{backgroundColor: "white", border: "4px solid " + (statement.agreement == 'agree' ? 'slateblue' : 'crimson')}} className="p2">
                                            <h4 style={{color: 'black'}}>{ statement.text }</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="debates col-md-12">
                                    { debates.map((d, i) => {
                                        return (<FlippableDebateCard key={i} user={user} { ...d } />)
                                    })}
                                </div>
                                <div className="logout">
                                    <a href="index.html" className="logout"><img src="/images/logout.png"/></a>
                                </div>
                                <div className="challenge">
                                    <p><i className="fa fa-plus-circle" aria-hidden="true" data-toggle="modal"
                                          data-target="#challenge-conf"/></p>
                                </div>
                            </div>
                            <div className="profile-content notifications col-md-8 col-md-offset-2">
                                <h2 className="profile-name">Name goes here</h2>
                                <div className="scores">
                                    <div className="col-md-6">
                                        <p><img src="/images/best-debater-w.png"/> 235</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><img src="/images/peace.png" className="peace"/> 235</p>
                                    </div>
                                </div>
                                <div className="notifications col-md-12">
                                    <h3>Notifications</h3>
                                    <div className="notification">
                                        <p><a href="#">Username</a> challenged you to a debate</p>
                                    </div>
                                    <div className="notification">
                                        <p><a href="#">Username</a> accepted your debate request</p>
                                    </div>
                                    <div className="notification">
                                        <p><a href="#">Username</a> replied to your debate</p>
                                    </div>
                                    <div className="notification">
                                        <p><a href="#">Username</a> subscribed to your debate</p>
                                    </div>
                                    <div className="notification">
                                        <p><a href="#">Username</a> rated your argument factual</p>
                                    </div>
                                    <div className="notification">
                                        <p><a href="#">Username</a> responded to the debate <a href="#">debate name</a>
                                        </p>
                                    </div>
                                    <div className="notification">
                                        <p>A new question has been chosen in the debate <a href="#">debate name</a></p>
                                    </div>
                                </div>
                                <div className="next-buttons col-md-12 col-sm-12">
                                    <div className="col-md-6 col-sm-6">
                                        <button className="back">Back</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <button className="next">Next</button>
                                    </div>
                                </div>
                                <div className="logout">
                                    <a href="index.html" className="logout"><img src="/images/logout.png"/></a>
                                </div>
                                <div className="challenge">
                                    <i className="fa fa-plus-circle" aria-hidden="true" data-toggle="modal"
                                       data-target="#challenge-conf"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


                <div id="view-debate" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="chat-header col-md-12">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="user-img">
                                        <p><a href="profile.html"
                                              style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
                                        </p>
                                        <p>Username</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <div className="user-img">
                                        <p><a href="profile.html"
                                              style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
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
                                              style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
                                        </p>
                                    </div>
                                    <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse varius egestas lacinia. </p>
                                    <p className="time-posted">25m</p>
                                </div>
                                <div className="message-box agr-message">
                                    <div className="username">
                                        <p><a href="profile.html"
                                              style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
                                        </p>
                                    </div>
                                    <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse varius egestas lacinia. </p>
                                    <p className="time-posted">25m</p>
                                </div>
                                <div className="message-box dis-message">
                                    <div className="username">
                                        <p><a href="profile.html"
                                              style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
                                        </p>
                                    </div>
                                    <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse varius egestas lacinia. </p>
                                    <p className="time-posted">25m</p>
                                </div>
                                <div className="message-box agr-message">
                                    <div className="username">
                                        <p><a href="profile.html"
                                              style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
                                        </p>
                                    </div>
                                    <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse varius egestas lacinia. </p>
                                    <p className="time-posted">25m</p>
                                </div>
                                <div className="message-box dis-message">
                                    <div className="username">
                                        <p><a href="profile.html"
                                              style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
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
                <div id="rankings" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="my-ranking">
                                <p className="my-info"><a href="profile.html"
                                                          style={{background: "url(img/pexels-photo-103123.jpeg) center center no-repeat;"}}></a>
                                    Priyanka Sundhar</p>
                            </div>
                            <div className="my-rank-num">
                                <p className="my-rank">#434</p>
                            </div>
                            <div className="top-ranks">
                                <div className="factual rank-content">
                                    <h2><img src="/images/best-debater.png"/> Most Factual Debater</h2>
                                    <ul className="rank-container col-md-12">
                                        <div className="first-place">
                                            <li><span className="rank-number">1</span> John Appleseed</li>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <li><span className="rank-number">2</span> John Appleseed</li>
                                            <li><span className="rank-number">3</span> John Appleseed</li>
                                            <li><span className="rank-number">4</span> John Appleseed</li>
                                            <li><span className="rank-number">5</span> John Appleseed</li>
                                            <li><span className="rank-number">6</span> John Appleseed</li>
                                            <li><span className="rank-number">7</span> John Appleseed</li>
                                            <li><span className="rank-number">8</span> John Appleseed</li>
                                            <li><span className="rank-number">9</span> John Appleseed</li>
                                            <li><span className="rank-number">10</span> John Appleseed</li>
                                            <li><span className="rank-number">11</span> John Appleseed</li>
                                            <li><span className="rank-number">12</span> John Appleseed</li>
                                            <li><span className="rank-number">13</span> John Appleseed</li>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <li><span className="rank-number">14</span> John Appleseed</li>
                                            <li><span className="rank-number">15</span> John Appleseed</li>
                                            <li><span className="rank-number">16</span> John Appleseed</li>
                                            <li><span className="rank-number">17</span> John Appleseed</li>
                                            <li><span className="rank-number">18</span> John Appleseed</li>
                                            <li><span className="rank-number">19</span> John Appleseed</li>
                                            <li><span className="rank-number">20</span> John Appleseed</li>
                                            <li><span className="rank-number">21</span> John Appleseed</li>
                                            <li><span className="rank-number">22</span> John Appleseed</li>
                                            <li><span className="rank-number">23</span> John Appleseed</li>
                                            <li><span className="rank-number">24</span> John Appleseed</li>
                                            <li><span className="rank-number">25</span> John Appleseed</li>
                                        </div>
                                    </ul>
                                    <div className="next-buttons col-md-12 col-sm-12">
                                        <div className="col-md-6 col-sm-6">
                                            <button className="back">Back</button>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <button className="next">Next</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="emotional rank-content">
                                    <h2><i className="fa fa-hand-peace-o" aria-hidden="true"/> Most <span
                                        className="coexist"><span className="C">C</span><span
                                        className="O">O</span><span className="E">E</span><span
                                        className="X">X</span><span className="I">I</span><span
                                        className="S">S</span><span className="T">T</span><span
                                        className="I">I</span><span className="N">N</span><span
                                        className="G">G</span></span>
                                        Debater</h2>
                                    <ul className="rank-container col-md-12">
                                        <div className="first-place">
                                            <li><span className="rank-number">1</span> John Appleseed</li>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <li><span className="rank-number">2</span> John Appleseed</li>
                                            <li><span className="rank-number">3</span> John Appleseed</li>
                                            <li><span className="rank-number">4</span> John Appleseed</li>
                                            <li><span className="rank-number">5</span> John Appleseed</li>
                                            <li><span className="rank-number">6</span> John Appleseed</li>
                                            <li><span className="rank-number">7</span> John Appleseed</li>
                                            <li><span className="rank-number">8</span> John Appleseed</li>
                                            <li><span className="rank-number">9</span> John Appleseed</li>
                                            <li><span className="rank-number">10</span> John Appleseed</li>
                                            <li><span className="rank-number">11</span> John Appleseed</li>
                                            <li><span className="rank-number">12</span> John Appleseed</li>
                                            <li><span className="rank-number">13</span> John Appleseed</li>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <li><span className="rank-number">14</span> John Appleseed</li>
                                            <li><span className="rank-number">15</span> John Appleseed</li>
                                            <li><span className="rank-number">16</span> John Appleseed</li>
                                            <li><span className="rank-number">17</span> John Appleseed</li>
                                            <li><span className="rank-number">18</span> John Appleseed</li>
                                            <li><span className="rank-number">19</span> John Appleseed</li>
                                            <li><span className="rank-number">20</span> John Appleseed</li>
                                            <li><span className="rank-number">21</span> John Appleseed</li>
                                            <li><span className="rank-number">22</span> John Appleseed</li>
                                            <li><span className="rank-number">23</span> John Appleseed</li>
                                            <li><span className="rank-number">24</span> John Appleseed</li>
                                            <li><span className="rank-number">25</span> John Appleseed</li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div className="close-bottom">
                                <button type="button" className="btn btn-default" data-dismiss="modal"><i
                                    className="fa fa-times-circle" aria-hidden="true"/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="challenge-conf" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <p>Are you sure you want to challenge <span>Username</span> to a debate?</p>
                            <div className="col-md-6 cancel">
                                <button data-dismiss="modal">Cancel</button>
                            </div>
                            <div className="col-md-6 confirm">
                                <button data-dismiss="modal">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default ProfilePage;