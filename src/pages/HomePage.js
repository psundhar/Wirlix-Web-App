import React from 'react';
import StatementCard from '../components/StatementCard';
import apiFetch from '../utilities/apiFetch';
import NavBar from '../components/NavBar';
import ChallengeDialog from '../components/ChallengeDialog';
import TempPopup from '../components/TempPopup';
import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride.scss';

const MIN_VOTES = 5;

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
            showChallengeSent: false,
            joyrideSteps: [],
        };
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }

        this.setState({
            joyrideSteps: [
            {
                title: 'Factual Arguments',
                text: 'This is the factual argument section',
                selector: '.factual-img',
                position: 'top',
                type: 'hover',
            },
                {
                    title: 'Trigger Action',
                    text: 'Scroll to correct position if required',
                    selector: 'h1.main-question',
                    position: 'top',
                    style: {
                        mainColor: '#a350f0',
                        beacon: {
                            inner: '#a350f0',
                            outer: '#a350f0',
                        },
                    },
                },
            ],

        });


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

        if(this.state.statementText.length == 0) {
            return; // Don't submit empty statements
        }

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
            statement.user = this.state.user;
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
            this.setState({showChallengeSent: true});

            setTimeout(() => {
                this.setState({showChallengeSent: false});
            }, 2500);
        });
    },

    render() {
        const { topic, user } = this.state;
        console.log(this.state.steps);
        return (
        <div>
        <Joyride
            ref="joyride"
            steps={this.state.joyrideSteps}
            run={true}
            showOverlay={true}
            autoStart={true}
            locale={{
                back: (<span>Back</span>),
                close: (<span>Close</span>),
                last: (<span>Last</span>),
                next: (<span>Next</span>),
                skip: (<span>Skip</span>),
            }}
            debug={true}
            type="continuous"
            callback={(obj) => console.log(obj)}
        />
        <div className="main-section-home">
            { Object.keys(user).length > 0 && (<NavBar user={ user } />) }
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
                <source src="video/1 North Korea.mp4" type="video/mp4" />
                 <source src="video/wirlix_promo_video_v1.webm" type="video/webm" />
            </video>
        </div>
        <section className="news-section" id="cont-section">
            <div className="response">
                <div className="container">
                    <h1 className="main-question col-md-12">{ topic.prompt }</h1>
                    <div className="col-md-8 col-md-offset-2">
                        <textarea  className="col-md-12 col-xs-12 col-sm-12" placeholder="What's your first opinion?" onChange={ this.handleStatementTextChange } value={ this.state.statementText }></textarea>
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
                                <h2 className="col-md-12"><img className="factual-img" src="images/factual-w.png"/></h2>
                                <div className="comment-container col-md-12">
                                    { this.state.statements.filter(s => s.voters && s.voters.filter(v => v.isRational).length >= MIN_VOTES).map((s, i) => {
                                        return (
                                            <StatementCard key={i} handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } { ...s }/>
                                        )
                                    })}

                                </div>
                            </div>

                            <div className="col-md-4 vote-col middle" id ="middle">
                                <h2 className="col-md-12">You Decide</h2>
                                <div className="comment-container col-md-12">
                                    { this.state.statements.filter(s => s.voters && s.voters.filter(v => v.isRational).length < MIN_VOTES && s.voters.filter(v => !v.isRational).length < MIN_VOTES).map(s => {
                                        return (
                                            <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } { ...s }/>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="col-md-4 vote-col emotional" id = "emotional">
                                <h2 className="col-md-12"><img src="images/emotional-w.png" /></h2>
                                <div className="comment-container col-md-12">
                                    { this.state.statements.filter(s => s.voters && s.voters.filter(v => !v.isRational).length >= MIN_VOTES).map(s => {
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

        <ChallengeDialog handleCancel={this.handleCancel} handleConfirm={this.handleConfirm} topicId={ this.state.challenge.topicId } statementId={ this.state.challenge.statementId } user={ user } />
        <TempPopup show={ this.state.showChallengeSent } color="white" backgroundColor="crimson"><div className="center bold">Challenge Sent!</div></TempPopup>
        </div>
        )
    },
});

export default HomePage;
