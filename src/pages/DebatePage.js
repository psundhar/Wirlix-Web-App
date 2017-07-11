import React from 'react';
import MyDebates from '../components/MyDebates';
import FlippableDebateCard from '../components/FlippableDebateCard';

const DebatePage = React.createClass({
    getInitialState() {
        return {
            debates: [],
            topic: {},
            userId: null,
        }
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }
    },

    render: function() {
        return (
            <div>
    <section className="debate-section">
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
            <li><a className="profile-nav" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></li>
            <li><a className="help" href="tutorial.html">? <br/><span>See Tutorial</span></a></li>

        </ul>
        </div>
        </div>
        </nav>
        <div className="response">
            <div className="container">
            <h1 className="main-question col-md-12" id="debate-prompt">{ this.state.topic.prompt }</h1>
        <div className="col-md-4 col-md-offset-4 my-debates-button">
            <a className="col-md-12" href="#">My Debates</a>
        </div>
        </div>
        </div>

        <MyDebates debates={ this.state.debates } userId={ this.state.userId}/>
        <div className="comments">
            <div className="container">
            <div className="border decide">
            <ul  className="nav nav-pills">
                <li className="active col-xs-12">
                <a  href="#factual" data-toggle="tab">Best Debates</a>
                </li>
                <li className="col-xs-12"><a href="#middle" data-toggle="tab">Live Right Now</a></li>
                <li className="col-xs-12"><a href="#emotional" data-toggle="tab">Subscribed</a></li>
            </ul>
            <div className="tab-content">
            <div className="col-md-4 vote-col factual active" id ="factual">
            <h2 className="col-md-12"><img src="images/eye-w.png" /><br/>Best Debates</h2>
            <div className="debates col-md-12" id="best-debates-list">
                { this.state.debates.filter((d) => {
                    return d.views > 10;
                }).map((d, i) => {
                    return (
                        <FlippableDebateCard key={i} {...d} />
                    )
                })}
            </div>
        </div>

        <div className="col-md-4 vote-col middle" id ="middle">
            <h2 className="col-md-12"><br/>Live Right Now</h2>
            <div className="debates col-md-12 live-debates">
                { this.state.debates.filter((d) => {
                    return Date.parse(d.updated) >= (Date.now() - 600000) //10 minutes ago
                }).map((d, i) => {
                    return (
                        <FlippableDebateCard key={i} {...d} />
                    )
                })}
            </div>
        </div>

        <div className="col-md-4 vote-col emotional" id = "emotional">
            <h2 className="col-md-12"><img src="images/check-mark.png" /><br/>Subscribed Debates</h2>
        <div className="debates col-md-12" id="subscribed-debates-list">
            { this.state.debates.filter((d) => {
                return d.subscribers.includes(this.state.userId);
            }).map((d,i)=> {
                return (
                    <FlippableDebateCard key={i} {...d}/>
                )
            })}
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        <div className="overlay">

            </div>
            </section>

            <div id="convo" className="modal fade" role="dialog">
            <div className="modal-dialog">

        <div className="modal-content">
            <div className="chat-header col-md-12">
            <div className="col-md-6 col-sm-6 col-xs-6">
            <div className="user-img">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            <p>Username</p>
            </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-6">
            <div className="user-img">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            <p>Username</p>
            </div>
            </div>
            <div className="vote-bar">
            <div className="vote-amt">
            <p><img src="images/eye-b.png" /> 200</p>
            </div>
            <div className="vote-amt">
            <p><img src="images/check-mark-b.png" /> 278</p>
            </div>
            </div>
            </div>
            <div className="chat-box">
            <div className="message-box dis-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box agr-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box dis-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box agr-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box dis-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        </div>
        <div className="reply-box col-md-12">
            <textarea placeholder="Write your opinion...."></textarea>
            <div className="col-md-4 col-sm-4 col-xs-4 end-button">
            <button className="end-debate">End Debate</button>
        </div>
        <div className="col-md-8 col-sm-8 col-xs-8 reply-button">
            <button className="reply-submit">Reply</button>
            </div>
            </div>
            <div className="close-bottom">
            <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            <div className="end-confirm">
            <p>Are you sure you want to end this debate?</p>
        <div className="cancel col-md-6 col-sm-6 col-xs-6">
            <button>No</button>
            </div>
            <div className="confirm col-md-6 col-sm-6 col-xs-6">
            <button>Yes</button>
            </div>
            </div>
            <div className="end-message">
            <p className="quote">Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.</p>
        <p className="coexist"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span></p>
            </div>
            <div className="end-overlay">

            </div>
            </div>
            <div className="q-container">
            <div className="question-box one">
            <p className="number">1</p>
            </div>
            <div className="question-box two">
            <p className="number">2</p>
            </div>
            <div className="question-box three">
            <p className="number">3</p>
            </div>
            </div>
            <div className="question one" style={{display: "none"}}>
            <div className="message-box question-box one">
            <div className="username">
            <p className="wirlix-img" style={{background: "url(images/Wirlix_InvertedLogo.png) center center no-repeat"}}></p>
            <p> Wirlix</p>
            </div>
            <p className="message">this is question #1</p>
        <p className="time-posted">25m</p>
        </div>
        </div>
        <div className="question two" style={{display: "none"}}>
            <div className="message-box question-box one">
            <div className="username">
            <p className="wirlix-img" style={{background: "url(images/Wirlix_InvertedLogo.png) center center no-repeat"}}></p>
            <p> Wirlix</p>
            </div>
            <p className="message">this is question #2</p>
        <p className="time-posted">25m</p>
        </div>
        </div>
        <div className="question three" style={{display: "none"}}>
            <div className="message-box question-box one">
            <div className="username">
            <p className="wirlix-img" style={{background: "url(images/Wirlix_InvertedLogo.png) center center no-repeat"}}></p>
            <p> Wirlix</p>
            </div>
            <p className="message">this is question #3</p>
        <p className="time-posted">25m</p>
        </div>
        </div>
        </div>
        </div>

        <div id="view-debate" className="modal fade" role="dialog">
            <div className="modal-dialog">
        <div className="modal-content">
            <div className="chat-header col-md-12">
            <div className="col-md-6 col-sm-6 col-xs-6">
            <div className="user-img">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            <p>Username</p>
            </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-6">
            <div className="user-img">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            <p>Username</p>
            </div>
            </div>
            <div className="vote-bar">
            <div className="vote-amt">
            <p><img src="images/eye-b.png" /> 200</p>
            </div>
            <div className="vote-amt">
            <p><img src="images/check-mark-b.png" /> 278</p>
            </div>
            </div>
            </div>
            <div className="chat-box">
            <div className="message-box dis-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box agr-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box dis-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box agr-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        <div className="message-box dis-message">
            <div className="username">
            <p><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a></p>
            </div>
            <p className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p className="time-posted">25m</p>
        </div>
        </div>
        <div className="vote-box col-md-12">
            <div className="col-md-6 col-md-offset-3">
            <p><i className="fa fa-check"></i> Subscribe</p>
            </div>
            </div>
            <div className="close-bottom">
            <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            </div>

            </div>
            </div>
            <div id="rankings" className="modal fade" role="dialog">
            <div className="modal-dialog">
        <div className="modal-content">
            <div className="my-ranking">
            <p className="my-info"><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a> Priyanka Sundhar</p>
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
            </div>)

    },
});

export default DebatePage;