import React from 'react';
import FlippableDebateCard from '../components/FlippableDebateCard';
import NavBar from '../components/NavBar';
import ChallengeNotificationsList from '../components/ChallengeNotificationsList';
import apiFetch from '../utilities/apiFetch';
import DebateModal from '../components/DebateModal';
import { registerSocketEventHandler } from '../utilities/realTime';
import { getDebate } from '../utilities/data';
import IO from 'socket.io-client';
import EndDebateOverlay from '../components/EndDebateOverlay';
import EditableBio from '../components/EditableBio';
import EditableFirstArgument from '../components/EditableFirstArgument';
import { factualRankings, emotionalRankings, findRank, countVoteTypes } from '../utilities/rankings';
import MyDebates from '../components/MyDebates';

import { connect } from 'react-redux';
import { updateDebateAction, updateDebate, deleteDebate, subscribeToDebate } from '../actionCreators/debateActionCreators';
import { updateStatement } from '../actionCreators/statementActionCreators';
import { updateUser } from '../actionCreators/userActionCreators';

const mapStateToProps = (state, ownProps) => {
    const users = state.users;

    const profileUser = users.find(u => u._id == ownProps.match.params.id);

    const loggedInUser = users.find(u => u._id == state.authUserId);

    const statement = state.statements.find(s => {
        return s.user._id == state.authUserId
    });

    return {
        users: state.users || [],
        loggedInUser: loggedInUser || {},
        profileUser: profileUser || {},
        statement: statement || {},
        userChallenges: state.userChallenges || [],
        topic: state.topic || {},
        debates: state.debates || [],
        statements: state.statements || [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshDebate: (data) => {
            getDebate(data._id, json => {
                dispatch(updateDebateAction(json));
            });
        },

        viewDebate: (debateId) => {
            dispatch(updateDebate(debateId, {viewed: true}));
        },

        endDebate: (debateId) => {
            dispatch(deleteDebate(debateId));
        },

        handleSubscribeToggle: function(debateId) {
            dispatch(subscribeToDebate(debateId));
        },

        handleStatementEdit(statement) {
            return (text) => {
                dispatch(updateStatement(statement._id, { text }));
            }
        },

        handleBioEdit(loggedInUser) {
            return (text) => {
                dispatch(updateUser(loggedInUser._id, {
                    bio: text,
                }));
            }
        },
    }
}

const ProfilePage = React.createClass({

    getInitialState() {
        return {
            modalDebate: {},
            showEndDebateMessage: false,
            showEndDebateMessageFadeOut: false,
            showMyDebates: false,
        };
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }

        const socket = IO(); // Will need to be altered in production

        registerSocketEventHandler(socket, 'updates:debates', this.props.refreshDebate);
    },

    handleEnterDebate(debate) {
        this.setState({ modalDebate: debate });

        this.props.viewDebate(debate._id);
    },

    handleChallengeResponse(accepted) {
        return (acceptedChallenge) => {
            const userChallenges = this.state.userChallenges;

            const challenge = userChallenges.find(c => c._id == acceptedChallenge._id);

            let status = "accepted";

            if(!accepted) {
                status = "declined";
            }

            challenge.status = status;
            // Make request to update db state
            apiFetch('/api/challenges/' +  acceptedChallenge._id, 'PUT', {
                status,
                notifyChallengee: false,
                notifyChallenger: status == 'accepted',
            })
            .then(res => {
                this.setState({userChallenges});
                return res.json();
            })
            .then(challenge => {
                if(status == "declined") {
                    return Promise.resolve({ json: () => null });
                }
                else {
                    return apiFetch('/api/debates/', 'POST', {
                        topic: challenge.topic,
                        challenger: challenge.challenger,
                        challengee: challenge.challengee,
                        statement: challenge.statement,
                    });
                }
            })
            .then((res) => res.json())
            .then((debate) => {
                if(!debate) {
                    return;
                }

                const debates = this.state.debates;
                debates.push(debate);
                this.setState({ debates });
            })
            .catch((err) => console.log(err));
        }

    },

    handleMyDebatesClick() {
        this.setState({showMyDebates: !this.state.showMyDebates});
    },

    render() {
        const { modalDebate, showEndDebateMessage, showEndDebateMessageFadeOut, showMyDebates } = this.state;
        const { handleBioEdit, loggedInUser, profileUser, statements, statement, debates, topic, userChallenges, users, handleStatementEdit } = this.props;

        if(!profileUser) {
            return <span></span>
        }

        const isMyProfile = loggedInUser._id == profileUser._id;

        const profileImage = profileUser.image || '/images/pexels-photo-103123.jpeg';

        let profileName = [ profileUser.firstName ];

        if(profileUser.lastName) {
            profileName.push(profileUser.lastName);
        }

        profileName = profileName.join(' ');

        const cachedStatements = countVoteTypes(statements);

        const factualRank = findRank(factualRankings([...cachedStatements]), profileUser._id);

        const emotionalRank = findRank(emotionalRankings([...cachedStatements]), profileUser._id);

        const myDebates = debates.filter((d) => {
            return d.challenger._id == profileUser._id || d.challengee._id == profileUser._id;
        });

        return (
            <div >
                <div className="main-content profile" style={{ minHeight:"1400px"}} >
                    <NavBar user={loggedInUser}/>
                    <section className="profile-container" >
                           
                                <div className="container gradient" style={{paddingBottom:"50px", borderBottom:"2px solid white"}}>
                              {  /*<div className="profile-pic col-md-4 col-md-offset-4">
                                        <div className="pic-crop"
                                             style={{background: "url(" + profileImage + ") center center no-repeat"}}></div>
                                    </div>*/}
                                    <div className="col-md-6 profile-pic">
                                        <div className="pic-crop"
                                             style={{background: "url(" + profileImage + ") center center no-repeat"}}>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{paddingLeft:"0px", marginLeft:"0px", float:"left"}}><h2 className="mb0" >{ profileName }</h2></div>
                                        <div style={{paddingLeft:"0px", marginLeft:"0px", float:"left", clear:"left", color:"white"}}><h3 className="small italic mb3" >@{ profileUser.username }</h3></div>
                                        <div className="mb2 col-md-12" style={{paddingLeft:"0px", marginLeft:"0px", float:"left", clear:"left", width:"100%"}}>
                                                <EditableBio isEditable={ isMyProfile } handleEdit={handleBioEdit(profileUser)} bio={ profileUser.bio } />
                                        </div>
                                    </div>
                                </div>
                        
                                      
                                <div className="qotd col-md-12 mb4 border-white pb3" style={{paddingBottom:"70px"}}>
                                            <div className="gotd-banner">
                                                <p style={{fontSize:"1.5em", backgroundColor:"black", color:"white"}}> Topic of the Day</p>
        {/*
                                                <h3 className="mb2">{ topic.prompt }</h3>
        */}
                                                <div className="dummyTopic" style={{color:"black", fontSize:"1.5em", marginBottom:"0px", paddingTop:"30px"}}>{ topic.prompt }</div>

                                                <div className="profileOpinion col-md-8 col-md-offset-2" style={{border:"2px solid black",borderRadius:"20px"}}>
                                                <EditableFirstArgument isEditable={ isMyProfile } text={ statement.text }  handleEdit={ handleStatementEdit(statement) }/>
                                                </div>
                                            </div>
                                </div>
                       

                        <div className="container" style={{backgroundColor:"white"}}>
                
                            
                                 { isMyProfile && (
                                    <div className="col-md-6 border-bottom border-white pb3 mb2" style={{ paddingRight:"30px", paddingTop:"38px"}}>
                                        <h3 className="large clickable mb3 mt0" style={{paddingBottom:"25px", color:"#C41717"}} onClick={ this.handleMyDebatesClick }><u>My Debates</u></h3>
                                        <MyDebates handleReplyClick={this.handleEnterDebate} debates={ myDebates } user={ profileUser }/>
                                    </div>
                                )}

                                { !isMyProfile && (<div className="debates col-md-12 border-bottom border-white pb3">
                                        <h3 className="large clickable mb3 mt0" style={{paddingBottom:"25px", color:"#C41717"}}><u>ACTIVITY</u></h3>
                                    { debates.map((d, i) => {
                                        return (<FlippableDebateCard handleSubscribeToggle={this.handleSubscribeToggle} key={i} user={ loggedInUser } debate={ d } handleEnterDebate={ this.handleEnterDebate } />)
                                    })}
                                </div>) } 
                           
                                
                                { isMyProfile && (<div className="col-md-6" style={{borderLeft:"2px solid darkgray"}}>
                                    <div id ="profile-notification"> <ChallengeNotificationsList handleEnterDebate={this.handleEnterDebate} handleAcceptChallenge={this.handleChallengeResponse(true)} handleDeclineChallenge={ this.handleChallengeResponse(false) } user={loggedInUser} />
                                   </div> 
                                </div>) }
                        </div>
                            
                                {/*       
                        <div className="container">
                            <div className="profile-content col-md-8 col-md-offset-2">
                                <div className="border-bottom border-white clearfix pb3">
                                    <h2 className="mb0">{ profileName }</h2>
                                    <h3 className="small italic mb3">@{ profileUser.username }</h3>
                                    <div className="mb2 col-md-12">
                                        <EditableBio isEditable={ isMyProfile } handleEdit={handleBioEdit(profileUser)} bio={ profileUser.bio } />
                                    </div>

                                    <div className="scores">
                                        <div className="col-md-6">
                                            <h4>Factual Appeal Rank</h4>
                                            <p className="p1"><img src="/images/best-debater-w.png" className="m0"/> { factualRank ? factualRank : 'N/A' }</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h4>Emotional Appeal Rank</h4>
                                            <p className="p1"><img src="/images/peace.png" className="peace m0"/> { emotionalRank ? emotionalRank : 'N/A' }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="qotd col-md-12 mb4 border-bottom border-white pb3">
                                    <div className="gotd-banner">
                                        <p style={{fontSize:"1.5em", backgroundColor:"#292C2D"}}> Topic of the Day</p>

                                 //       <h3 className="mb2">{ topic.prompt }</h3>

                                        <div className="dummyTopic">{ topic.prompt }</div>

                                        <EditableFirstArgument isEditable={ isMyProfile } text={ statement.text }  handleEdit={ handleStatementEdit(statement) }/>

                                    </div>
                                </div>

                                { isMyProfile && (
                                    <div className="col-md-12 border-bottom border-white pb3 mb2">
                                        <h3 className="large clickable mb3 mt0" onClick={ this.handleMyDebatesClick }>My Debates</h3>
                                        <MyDebates handleReplyClick={this.handleEnterDebate} debates={ myDebates } user={ profileUser }/>
                                    </div>
                                )}

                                { !isMyProfile && (<div className="debates col-md-12 border-bottom border-white pb3">
                                    { debates.map((d, i) => {
                                        return (<FlippableDebateCard handleSubscribeToggle={this.handleSubscribeToggle} key={i} user={ loggedInUser } debate={ d } handleEnterDebate={ this.handleEnterDebate } />)
                                    })}
                                </div>) }
                                {isMyProfile && (
                                    <div className="logout">
                                        <a href="/logout" className="logout"><img src="/images/logout.png"/></a>
                                    </div>
                                )}
                                
                                {!isMyProfile && ( <div className="challenge">
                                    <p><i className="fa fa-plus-circle" aria-hidden="true" data-toggle="modal"
                                          data-target="#challenge-conf"/></p>
                                </div> ) }

                               <div id ="profile-notification"> { isMyProfile && (<ChallengeNotificationsList handleEnterDebate={this.handleEnterDebate} handleAcceptChallenge={this.handleChallengeResponse(true)} handleDeclineChallenge={ this.handleChallengeResponse(false) } user={loggedInUser} />) }
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
                        </div> */}
                    </section>
                </div>

                <DebateModal handleSubscribeToggle={this.handleSubscribeToggle} questions={topic.questions} handleEndDebate={ this.handleEndDebate } user={loggedInUser} handleNewMessage={this.handleNewMessage} debate={ this.state.modalDebate }/>

                { showEndDebateMessage && (<EndDebateOverlay fadeOut={ showEndDebateMessageFadeOut }/>) }

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
