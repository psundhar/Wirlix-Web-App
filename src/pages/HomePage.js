import React from 'react';
import StatementCard from '../components/StatementCard';
import apiFetch from '../utilities/apiFetch';
import NavBar from '../components/NavBar';
import ChallengeDialog from '../components/ChallengeDialog';

const HomePage = React.createClass({

    getInitialState() {
        return {
            topic: {},
            statementText: '',
            statements: [],
            user: {},
            challenge: {
                statementId: null,
                topicId: null,
            },
        };
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }
    },

    handleStatementTextChange(e) {
        this.setState({ statementText: e.target.value });
    },

    handleVote(isRational, statementId) {
        const statements = this.state.statements;

        const s = statements.find(s => s._id == statementId);

        if(s) {
            apiFetch('/api/statements/' + s._id, 'PUT', {isRational})
            .catch((err) => {
                console.log(err);
            });

            const existingVote = s.voters.find(v => v.user == this.state.user._id);

            if(existingVote) {
                existingVote.isRational = isRational;
            }
            else {
                s.voters.push({ user: this.state.user._id, isRational });
            }

            this.setState({ statements });
        }
    },

    handleSubmit(agree) {
        let that = this;

        apiFetch('/api/statements', 'POST', {
            topic: this.state.topic._id,
            text: this.state.statementText,
            agreement: agree ? 'agree' : 'disagree',
        })
        .then((res) => {
            that.setState({ statementText: '' });
            return res.json();
        })
        .then(statement => {
            const statements = that.state.statements;
            statements.push(statement);
            that.setState({ statements });
        })
        .catch(function(err) {
            console.log(err);
        })
    },

    handleChallenge(statementId, topicId) {
        this.setState({
            challenge: {statementId, topicId}
        });
    },

    handleCancel() {
        this.setState({
            challenge: { statementId: null, topicId: null }
        });
    },

    handleConfirm(statementId, topicId, user) {
        // Make api call to create a challenge and then update state
        apiFetch('/api/challenges', 'POST', {
            statement: statementId,
            challenger: user._id,
            topic: topicId,
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        });
    },

    render() {
        const { topic, user } = this.state;

        return (
        <div>
        <div className="main-section-home">
            <NavBar user={ user } />
            <div className="overlay">

            </div>
            <div className="button-home col-md-4" style={{ position: "absolute" }}>
                <a href="#">Spark Controversy</a>
            </div>
            <div className="mute">
                <img src="images/sound.png" />
            </div>
            <div className="control">
                <img src="images/pause.png" />
            </div>
            <video playsInline autoPlay muted loop poster="" id="bgvid">
                <source src="video/wirlix_promo_video_v1.mp4" type="video/mp4" />
                <source src="video/wirlix_promo_video_v1.webm" type="video/webm" />
            </video>
        </div>
        <section className="news-section" id="cont-section">
            <div className="response">
                <div className="container">
                    <h1 className="main-question col-md-12">{ topic.prompt }</h1>
                    <div className="col-md-8 col-md-offset-2">
                        <textarea className="col-md-12 col-xs-12 col-sm-12" placeholder="What's your first opinion?" onChange={ this.handleStatementTextChange } value={ this.state.statementText }></textarea>
                        <div className="col-md-6 res-button agr">
                            <button onClick={() => { this.handleSubmit(true);}}>Agree</button>
                        </div>
                        <div className="col-md-6 res-button dis">
                            <button onClick={() => { this.handleSubmit(false)}}>Disagree</button>
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
                                    { this.state.statements.filter(s => s.voters && s.voters.filter(v => v.isRational).length >= 10).map(s => {
                                        return (
                                            <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } { ...s }/>
                                        )
                                    })}

                                </div>
                            </div>

                            <div className="col-md-4 vote-col middle" id ="middle">
                                <h2 className="col-md-12">You Decide</h2>
                                <div className="comment-container col-md-12">
                                    { this.state.statements.filter(s => s.voters && s.voters.filter(v => v.isRational).length < 10 && s.voters.filter(v => !v.isRational).length < 10).map(s => {
                                        return (
                                            <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } { ...s }/>
                                        )
                                    })}
                                </div>
                            </div>


                            <div className="col-md-4 vote-col emotional" id = "emotional">
                                <h2 className="col-md-12"><img src="images/emotional-w.png" /></h2>
                                <div className="comment-container col-md-12">
                                    { this.state.statements.filter(s => s.voters && s.voters.filter(v => !v.isRational).length >= 10).map(s => {
                                        return (
                                            <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } { ...s }/>
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
        <ChallengeDialog handleCancel={this.handleCancel} handleConfirm={this.handleConfirm} topicId={ this.state.challenge.topicId } statementId={ this.state.challenge.statementId } user={ user } />
        </div>
        )
    },
});

export default HomePage;