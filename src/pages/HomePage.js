import React from 'react';
import StatementCard from '../components/StatementCard';
import apiFetch from '../utilities/apiFetch';
import NavBar from '../components/NavBar';
import ChallengeDialog from '../components/ChallengeDialog';
import TempPopup from '../components/TempPopup';
import { registerSocketEventHandler } from '../utilities/realTime';
import IO from 'socket.io-client';
import { getStatement } from '../utilities/data';

const MIN_VOTES = 5;

const numVoters = (voters, filterFn) => {
    return voters.filter(filterFn).length;
};

const numRational = (voters) => {
    return numVoters(voters, (v) => {
        return v.isRational;
    });
};

const numEmotional = (voters) => {
    return numVoters(voters, (v) => {
        return !v.isRational;
    });
};

const sortOutcome = (a, b, primaryQualifier, secondaryQualifier = null) => {
    if(primaryQualifier(a) > primaryQualifier(b)) {
        return -1;
    }
    else if(primaryQualifier(a) < primaryQualifier(b)) {
        return 1;
    }
    else if(secondaryQualifier) {
        return secondaryQualifier(a) >= secondaryQualifier(b) ? -1 : 1;
    }
};

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
            showChallengeSent: false
        };
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }

        // Connect to server via websocket for live updates
        registerSocketEventHandler(IO(), 'updates:opinions', this.getUpdatedStatement);
    },

    getUpdatedStatement(data) {
        getStatement(data._id, json => {
            const statements = this.state.statements;

            const indexToEdit = statements.findIndex(s => s._id == data._id);

            console.log(indexToEdit, statements);

            if(indexToEdit > -1) {
                statements[indexToEdit] = json;
            }
            else {
                statements.push(json);
            }

            this.setState(statements);
        })
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
            console.log('your cannot submit empty opinion');
            return ; // Don't submit empty statements
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
        const { topic, user, statements } = this.state;
        const opinion=this.state.statementText.length!=0;

        return (
        <div>
        <div className="main-section-home">
            { Object.keys(user).length > 0 && (<NavBar user={ user } />) }
            <div className="overlay">

            </div>
            <div className="button-home col-md-4" style={{ position: "absolute" }}>
                <a href="#">What's Trending</a>
                <div className="arrow animated bounce">
                    <a href="#" id="arrow_button"> <img src="images/arrow.jpg" style={{width:"10px"}}/></a>
                </div>
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
                        <textarea className="col-md-12 col-xs-12 col-sm-12" placeholder="What's your first opinion?" onChange={ this.handleStatementTextChange } value={ this.state.statementText }></textarea>
                        <div className="col-md-6 res-button agr">
                            {opinion ? <button onClick={() => { this.handleSubmit(true);}}>Agree</button>:
                                <button data-toggle="modal" data-target="#opinion-conf" onClick={() => { this.handleSubmit(true);}}>Agree</button> }
                        </div>
                        <div className="col-md-6 res-button dis">
                            {opinion ? <button onClick={() => { this.handleSubmit(false);}}>Disagree<img src="images/thumbs_down.jpg" style={{height:"3px" ,width:"5px"}}/></button>:
                                <button data-toggle="modal" data-target="#opinion-conf" onClick={() => { this.handleSubmit(false);}}>Disagree &nbsp;<img src="images/thumbs_down.jpg" style={{height:"10px" ,width:"10px"}}/></button> }
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
                                    { statements.filter(s => s.voters && numRational(s.voters) >= MIN_VOTES)
                                        .sort((a, b) => {
                                            return sortOutcome(a, b, s => numRational(s.voters), s => s.voters.length );
                                        })
                                        .map((s, i) => {
                                        return (
                                            <StatementCard key={i} handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } createdDate={s.created}{ ...s }/>
                                        )
                                    })}

                                </div>
                            </div>

                            <div className="col-md-4 vote-col middle" id ="middle">
                                <h2 className="col-md-12">You Decide</h2>
                                <div className="comment-container col-md-12" id="you_decide">

                                    { statements.filter(s => s.voters && numRational(s.voters) < MIN_VOTES && numEmotional(s.voters) < MIN_VOTES)
                                        .sort((a, b) => {
                                            return a.created >= b.created ? -1 : 1;
                                        })
                                        .map(s => {
                                        return (
                                            <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } createdDate={s.created} { ...s }/>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="col-md-4 vote-col emotional" id = "emotional">
                                <h2 className="col-md-12"><img src="images/emotional-w.png" /></h2>
                                <div className="comment-container col-md-12">
                                    { statements.filter(s => s.voters && numEmotional(s.voters) >= MIN_VOTES)
                                        .sort((a, b) => {
                                            return sortOutcome(a, b, s => numEmotional(s.voters), s => s.voters.length);
                                        })
                                        .map(s => {
                                        return (
                                            <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.handleVote} showChallenge={ user._id != s.user._id } createdDate={s.created} { ...s }/>
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
            <div id ="opinion-conf" className="modal fade" data-toggle="opinion" role="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <p>Your opinion matters!!! Please Enter your opinion</p>
                        <div className="col-xs-6 col-sm-6 col-md-6 cancel">
                            <div className="col-xs-6 col-sm-6 col-md-6 cancel">
                                <button data-dismiss="modal" onClick={ () => handleCancel() }>Continue</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>)
    },
});

export default HomePage;
