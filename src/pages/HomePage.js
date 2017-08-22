import React from 'react';
import StatementCard from '../components/StatementCard';
import apiFetch from '../utilities/apiFetch';
import NavBar from '../components/NavBar';
import ChallengeDialog from '../components/ChallengeDialog';
import TempPopup from '../components/TempPopup';
import { registerSocketEventHandler } from '../utilities/realTime';
import IO from 'socket.io-client';
import { getStatement } from '../utilities/data';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { updateStatementAction, createStatement, voteOnStatement } from '../actionCreators/statementActionCreators';
import { createChallenge } from '../actionCreators/challengeActionCreators';

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

const mapStateToProps = state => {
    const user = state.users.find(u => u._id == state.authUserId);

    return {
        user,
        topic: state.topic,
        statements: state.statements,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshStatement: (statement) => {
            dispatch(updateStatementAction(statement));
        },
        addStatement: (statement, user) => {
            dispatch(createStatement(statement, user));
        },
        handleVote: (isRational, statementId) => {
            dispatch(voteOnStatement(statementId, isRational));
        },
        handleConfirm(statementId, topicId, user) {
            // Make api call to create a challenge and then update state
            dispatch(createChallenge(statementId, topicId, user));
        },
    };
};

const HomePage = React.createClass({

    getInitialState() {
        return {
            statementText: '',
            challenge: {
                statementId: null,
                topicId: null,
            },
            showChallengeSent: false,
        };
    },

    componentDidMount() {
        // Connect to server via websocket for live updates
        registerSocketEventHandler(IO(), 'updates:opinions', this.getUpdatedStatement);
    },

    getUpdatedStatement(data) {
        getStatement(data._id, json => {
            this.props.refreshStatement(json);
        });
    },

    handleStatementTextChange(e) {
        this.setState({ statementText: e.target.value });
    },

    handleSubmit(agree) {
        if(this.state.statementText.length == 0) {
            return; // Don't submit empty statements
        }

        this.props.addStatement({
            topic: this.props.topic._id,
            text: this.state.statementText,
            agreement: agree ? 'agree' : 'disagree',
        }, this.props.user);

        this.setState({ statementText: '' }); // Clear out statement text
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
        console.log("HERE");
        this.props.handleConfirm(statementId, topicId, user);

        this.setState({showChallengeSent: true});

        setTimeout(() => {
            this.setState({showChallengeSent: false});
        }, 2500);
    },

    render() {

        const { topic, user, statements } = this.props;
        const opinion=this.state.statementText.length!=0;

        return (
        <div>
        <div className="main-section-home">
            { Object.keys(user).length > 0 && (<NavBar user={ user } />) }
            <div className="overlay">

            </div>
            <div className="button-home col-md-4" style={{ position: "absolute" }}>
                <a href="#"><span style={{fontSize: "1.4em", fontFamily: 'Source Code Pro'}}>What's Trending</span></a>
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
                        <p className="homepagetooltip" data-tip="First Arguments are the user’s original stance on the controversy without discussing, debating or learning more about the controversy ">?</p>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                        <div className="col-md-6 res-button agr">
                            {opinion ? <button onClick={() => { this.handleSubmit(true);}}><span style={{fontFamily: "Raleway"}}>Submit in Agreement</span></button>:
                                <button data-toggle="modal" data-target="#opinion-conf" onClick={() => { this.handleSubmit(true);}}><span style={{fontFamily: "Raleway"}}>Submit in Agreement</span></button> }
                        </div>
                        <div className="col-md-6 res-button dis">
                            {opinion ? <button onClick={() => { this.handleSubmit(false);}}><span style={{fontFamily: "Raleway"}}>Submit in Disagreement</span></button>:
                                <button data-toggle="modal" data-target="#opinion-conf" onClick={() => { this.handleSubmit(false);}}><span style={{fontFamily: "Raleway"}}>Submit in Disagreement</span></button> }
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
                                <h2 className="col-md-12"><span data-tip="These arguments are more appealing to people's logic" style={{marginRight:"20px", marginLeft:"20px"}}>Most Factual</span><img src="images/best-debater-w.png"/></h2>
                                    <ReactTooltip place="top" type="dark" effect="float"/>

                                <div className="comment-container col-md-12">
                                    { statements.filter(s => s.voters && numRational(s.voters) >= MIN_VOTES)
                                        .sort((a, b) => {
                                            return sortOutcome(a, b, s => numRational(s.voters), s => s.voters.length );
                                        })
                                        .map((s, i) => {
                                        return (
                                            <StatementCard key={i} handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.props.handleVote} showChallenge={ user._id != s.user._id } createdDate={s.created}{ ...s }/>
                                        )
                                    })}

                                </div>
                            </div>

                            <div className="col-md-4 vote-col middle" id ="middle">
                                <h2 className="col-md-12"><span data-tip="These arguments require atleast five votes before being categorized">You Decide</span></h2>
                                <ReactTooltip place="top" type="dark" effect="float"/>
                                    
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
                                <h2 className="col-md-12"><span data-tip="These arguments are more appealing to people's emotions">Most Emotional</span><img style= {{height: "48px", width:"48px"}}src="images/heart-w.gif" /></h2>
                                <ReactTooltip place="top" type="dark" effect="float"/>
                                    
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
            <div id ="opinion-conf" className="modal fade in" data-toggle="opinion" role="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <p id="modalpar">Please Enter your opinion</p>

                            <div id="modalbut" className="cancel">
                                <button data-dismiss="modal" onClick={ () => handleCancel() }>X</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
