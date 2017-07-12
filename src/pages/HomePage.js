import React from 'react';

const HomePage = React.createClass({

    getInitialState() {
        return {
            topic: {},
        };
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }
    },

    render() {
        const { topic } = this.state;

        return (
        <div>
        <div className="main-section-home">
            <div className="content">
                <nav className="navbar navbar-default">
                    <div className="">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#"><img src="images/Wirlix_InvertedLogo.png" /></a>
                        </div>
                        <div className="collapse navbar-collapse center-m" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav center">
                                <li><a href="home.html">News</a></li>
                                <li><a href="debate.html">Debate</a></li>
                                <li><a href="#" data-toggle="modal" data-target="#rankings">Ranking</a></li>
                                <li><a href="about.html">About</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a className="profile-nav" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a></li>
                                <li><a className="help" href="tutorial.html">? <br/><span>See Tutorial</span></a></li>

                            </ul>
                        </div>
                    </div>
                </nav>


            </div>
            <div className="overlay">

            </div>
            <div className="button-home col-md-4">
                <a href="#">Spark Controversy</a>
            </div>
            <div className="mute">
                <img src="images/sound.png" />
            </div>
            <div className="control">
                <img src="images/pause.png" />
            </div>
            <video playsinline autoplay muted loop poster="" id="bgvid">
                <source src="video/wirlix_promo_video_v1.mp4" type="video/mp4" />
                <source src="video/wirlix_promo_video_v1.webm" type="video/webm" />
            </video>
        </div>
        <section className="news-section" id="cont-section">
            <div className="response">
                <div className="container">
                    <h1 className="main-question col-md-12">{ topic.prompt }</h1>
                    <div className="col-md-8 col-md-offset-2">
                        <textarea className="col-md-12 col-xs-12 col-sm-12" placeholder="What's your first opinion?"></textarea>
                        <div className="col-md-6 res-button agr">
                            <button>Agree</button>
                        </div>
                        <div className="col-md-6 res-button dis">
                            <button>Disagree</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comments">
                <div className="container">
                    <div className="border decide">
                        <ul  className="nav nav-pills">
                            <li className="active col-xs-12">
                                <a  href="#factual" data-toggle="tab">Factual</a>
                            </li>
                            <li className="col-xs-12"><a href="#emotional" data-toggle="tab">Emotional</a></li>
                            <li className="col-xs-12"><a href="#middle" data-toggle="tab">You Decide</a></li>
                        </ul>
                        <div className="tab-content">
                            <div className="col-md-4 vote-col factual active" id ="factual">
                                <h2 className="col-md-12"><img src="images/factual-w.png"/></h2>
                                <div className="comment-container col-md-12">
                                    <div className="comment">
                                        <p className="col-md-12">
                                            <a className="profile-pic" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href="profile.html" className="username">Username</a> <br/>
                                            I think that abortion should be
                                            legal because abortion is a
                                            women’s right. It is psychologically
                                            proven that women are more than
                                            capable of making a decision to
                                            keep or not keep a child. <i className="fa fa-plus-circle challenge" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" />
                                        </p>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote up"><img src="images/factual-w.png"/> <span className="vote-num">255</span></button>
                                        </div>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote down"><img src="images/emotional-w.png" /><span className="vote-num">255</span></button>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <p className="col-md-12">
                                            <a className="profile-pic" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href="profile.html" className="username">Username</a> <br/>
                                            I think that abortion should be
                                            legal because abortion is a
                                            women’s right. It is psychologically
                                            proven that women are more than
                                            capable of making a decision to
                                            keep or not keep a child. <i className="fa fa-plus-circle challenge" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" />
                                        </p>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote up"><img src="images/factual-w.png"/> <span className="vote-num">255</span></button>
                                        </div>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote down"><img src="images/emotional-w.png" /><span className="vote-num">255</span></button>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <p className="col-md-12">
                                            <a className="profile-pic" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href="profile.html" className="username">Username</a> <br/>
                                            I think that abortion should be
                                            legal because abortion is a
                                            women’s right. It is psychologically
                                            proven that women are more than
                                            capable of making a decision to
                                            keep or not keep a child. <i className="fa fa-plus-circle challenge" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" />
                                        </p>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote up"><img src="images/factual-w.png"/> <span className="vote-num">255</span></button>
                                        </div>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote down"><img src="images/emotional-w.png" /> 145</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 vote-col middle" id ="middle">
                                <h2 className="col-md-12">You Decide</h2>
                                <div className="comment-container col-md-12">
                                    <div className="comment">
                                        <p className="col-md-12">
                                            <a className="profile-pic" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href="profile.html" className="username">Username</a> <br/>
                                            I think that abortion should be
                                            legal because abortion is a
                                            women’s right. It is psychologically
                                            proven that women are more than
                                            capable of making a decision to
                                            keep or not keep a child.
                                        </p>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote up"><img src="images/factual-w.png"/> <span className="vote-num">255</span></button>
                                        </div>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote down"><img src="images/emotional-w.png" /><span className="vote-num">255</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-4 vote-col emotional" id = "emotional">
                                <h2 className="col-md-12"><img src="images/emotional-w.png" /></h2>
                                <div className="comment-container col-md-12">
                                    <div className="comment">
                                        <p className="col-md-12">
                                            <a className="profile-pic" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href="profile.html" className="username">Username</a> <br/>
                                            I think that abortion should be
                                            legal because abortion is a
                                            women’s right. It is psychologically
                                            proven that women are more than
                                            capable of making a decision to
                                            keep or not keep a child. <i className="fa fa-plus-circle challenge" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true"/>
                                        </p>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote up"><img src="images/factual-w.png"/> <span className="vote-num">54</span></button>
                                        </div>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote down"><img src="images/emotional-w.png" /><span className="vote-num">100</span></button>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <p className="col-md-12">
                                            <a className="profile-pic" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href="profile.html" className="username">Username</a> <br/>
                                            I think that abortion should be
                                            legal because abortion is a
                                            women’s right. It is psychologically
                                            proven that women are more than
                                            capable of making a decision to
                                            keep or not keep a child. <i className="fa fa-plus-circle challenge" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true"/>
                                        </p>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote up"><img src="images/factual-w.png"/> <span className="vote-num">54</span></button>
                                        </div>
                                        <div className="col-md-6 button-container">
                                            <button className="button-vote down"><img src="images/emotional-w.png" /><span className="vote-num">100</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay">

            </div>
        </section>
        <div id="rankings" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="my-ranking">
                        <p className="my-info"><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> Priyanka Sundhar</p>
                    </div>
                    <div className="my-rank-num">
                        <p className="my-rank">#434</p>
                    </div>
                    <div className="top-ranks">
                        <div className="factual rank-content">
                            <h2><img src="images/best-debater.png" /> Most Factual Debater</h2>
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
                            <h2><i className="fa fa-hand-peace-o" aria-hidden="true"></i> Most <span className="coexist"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span><span className="I">I</span><span className="N">N</span><span className="G">G</span></span>
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
                            <div className="next-buttons col-md-12 col-sm-12">
                                <div className="col-md-6 col-sm-6">
                                    <button className="back">Back</button>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <button className="next">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="close-bottom">
                        <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
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
    },
});

export default HomePage;