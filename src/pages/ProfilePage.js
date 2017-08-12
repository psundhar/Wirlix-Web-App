import React from 'react';
import FlippableDebateCard from '../components/FlippableDebateCard';
import NavBar from '../components/NavBar';
import ChallengeNotificationsList from '../components/ChallengeNotificationsList';
import apiFetch from '../utilities/apiFetch';
import DebateModal from '../components/DebateModal';
import { registerDebateUpdater } from '../utilities/componentMethods';
import { getDebate } from '../utilities/data';
import IO from 'socket.io-client';
import EndDebateOverlay from '../components/EndDebateOverlay';
import EditableBio from '../components/EditableBio';
import { factualRankings, emotionalRankings, findRank, countVoteTypes } from '../utilities/rankings';

const ProfilePage = React.createClass({

    getInitialState() {
        return {
            user: {},
            debates: [],
            statement: {},
            loggedInUser: {},
            topic: {},
            challenges: [],
            debateModal: { visible: false, debate: {} },
            showEndDebateMessage: false,
            showEndDebateMessageFadeOut: false,
            statements: [],
        };
    },

    updateDebate(debateId) {
        getDebate(debateId, json => {
            const debates = this.state.debates;

            const indexToEdit = debates.findIndex(d => d._id == debateId);

            if(indexToEdit > -1) {
                debates[indexToEdit] = json;
            }

            const updates = {debates};

            if(this.state.debateModal.debate._id === debateId) { // Update debate modal as necessary
                updates['debateModal'] = { debate: json };
            }

            this.setState(updates);
        });
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }

        const socket = IO(); // Will need to be altered in production

        registerDebateUpdater(socket, this.updateDebate);
    },

    handleEnterDebate(debate) {
        const debates = this.state.debates;

        const viewedDebate = debates.find(d => d._id == debate._id);

        viewedDebate.views += 1;

        apiFetch('/api/debates/' + debate._id, 'PUT', {viewed: true})
            .then(function(res) {
                if(!res.ok) {
                    console.log(res);
                }
            });

        this.setState({debates, debateModal: { debate }});
    },

    handleNewMessage(debate, text, isModerator = false) {
        const debates = this.state.debates;

        const newMessageDebate = debates.find(d => d._id == debate._id);

        const newMessageObj = {
            text,
        };

        if(!isModerator) {
            newMessageObj['user'] = this.state.user._id;
        }
        else {
            newMessageObj['moderator'] = true;
        }

        newMessageDebate.messages.push(newMessageObj);
        this.setState({debates});

        // Update db state
        apiFetch('/api/debates/' + debate._id, 'PUT', {
            message: newMessageObj
        })
            .then(res => res.json())
            .then(debate => {
                newMessageDebate.updated = debate.updated;
                this.setState({debates});
            })
            .catch(err => console.log(err));
    },

    handleChallengeResponse(accepted) {
        return (acceptedChallenge) => {
            const challenges = this.state.challenges;

            const challenge = challenges.find(c => c._id == acceptedChallenge._id);

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
                this.setState({challenges});
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

    handleEndDebate(debateObj) {
        const debates = this.state.debates;
        const challenges = this.state.challenges;

        const indexToDelete = debates.findIndex(d => d._id == debateObj._id);

        if(indexToDelete > -1) {
            debates.splice(indexToDelete, 1);
        }

        const dIndexToDelete = challenges.findIndex(c => {
            return (c.challenger._id == debateObj.challenger._id) && (c.challengee._id == debateObj.challengee._id) && (c.statement._id == debateObj.statement._id)
        });

        if(dIndexToDelete > -1) {
            challenges.splice(dIndexToDelete, 1);
        }

        this.setState({debates, challenges, showEndDebateMessage: true});

        setTimeout(() => {
            this.setState({ showEndDebateMessageFadeOut: true});
        }, 3000);

        apiFetch('/api/debates/' + debateObj._id, 'DELETE');
    },

    handleSubscribeToggle: function(debateId) {
        let debates = [...this.state.debates];
        const selectedDebate = debates.find(d => d._id == debateId);

        const sdSubscribers = selectedDebate.subscribers;
        let subscribed = "subscribe";

        if(sdSubscribers.some(sid => {
                return sid == this.state.user._id;
            })) { // Remove
            subscribed = "unsubscribe";
            selectedDebate.subscribers = sdSubscribers.filter(sid => { return sid != this.state.user._id});
        }
        else { // Add
            sdSubscribers.push(this.state.user._id);
        }

        this.setState({ debates });

        fetch('/api/debates/' + debateId, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                subscribed,
            }),
            credentials: "include",
        })
            .then(function(res) {
                if(!res.ok) {
                    console.log("Unable to update");
                }
            })
    },

    handleBioEdit(text) {
        const { user, loggedInUser } = this.state;

        if(user._id != loggedInUser._id) {
            return;
        }



        apiFetch('/api/users/' + loggedInUser._id, 'PUT', {
            bio: text,
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            user.bio = text;
            this.setState({user,});
        })
    },

    render() {
        const { user, statements, statement, debates, loggedInUser, topic, challenges, debateModal, showEndDebateMessage, showEndDebateMessageFadeOut } = this.state;

        const isMyProfile = loggedInUser._id == user._id;

        const profileImage = user.image || '/images/pexels-photo-103123.jpeg';

        let profileName = [ user.firstName ];

        if(user.lastName) {
            profileName.push(user.lastName);
        }

        profileName = profileName.join(' ');

        const cachedStatements = countVoteTypes(statements);

        const factualRank = findRank(factualRankings([...cachedStatements]), user._id);

        const emotionalRank = findRank(emotionalRankings([...cachedStatements]), user._id);

        return (
            <div>
                <div className="main-content profile" style={{minHeight:"1400px"}}>
                    <NavBar user={loggedInUser}/>
                    <section className="profile-container">
                        <div className="container">
                            <div className="profile-pic col-md-4 col-md-offset-4">
                                <div className="pic-crop"
                                     style={{backgroundSize: "cover", background: "url(" + profileImage + ") center center no-repeat"}}></div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="profile-content col-md-8 col-md-offset-2">
                                <div className="border-bottom border-white clearfix pb3">
                                    <h2 className="mb0">{ profileName }</h2>
                                    <h3 className="small italic mb3">@{ user.username }</h3>
                                    <div className="mb2 col-md-12">
                                        <EditableBio isEditable={ loggedInUser._id == user._id } handleEdit={this.handleBioEdit} bio={ user.bio } />
                                    </div>
                                    <div className="scores">
                                        <div className="col-md-6">
                                            <p className="p1"><img src="/images/best-debater-w.png" className="m0"/> { factualRank }</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="p1"><img src="/images/peace.png" className="peace m0"/> { emotionalRank }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="qotd col-md-12 mb4">
                                    <div className="gotd-banner">
                                        <h3 className="mb2">{ topic.prompt }</h3>
                                        { statement.text && statement.agreement && (<div style={{backgroundColor: "white", border: "4px solid " + (statement.agreement == 'agree' ? 'slateblue' : 'crimson')}} className="p2">
                                            <h4 style={{color: 'black'}}>{ statement.text }</h4>
                                        </div>) }
                                        {
                                            !statement.text && (<h4 className="mt4">No opinion available</h4>)
                                        }
                                        { !isMyProfile && statement.text && (<button>Challenge this statement</button>) }
                                    </div>
                                </div>

                                <div className="debates col-md-12">
                                    { debates.map((d, i) => {
                                        return (<FlippableDebateCard handleSubscribeToggle={this.handleSubscribeToggle} key={i} user={loggedInUser} debate={ d } handleEnterDebate={ this.handleEnterDebate } />)
                                    })}
                                </div>
                                {isMyProfile && (
                                    <div className="logout">
                                        <a href="/logout" className="logout"><img src="/images/logout.png"/></a>
                                    </div>
                                )}

                                {!isMyProfile && ( <div className="challenge">
                                    <p><i className="fa fa-plus-circle" aria-hidden="true" data-toggle="modal"
                                          data-target="#challenge-conf"/></p>
                                </div> ) }

                                { isMyProfile && (<ChallengeNotificationsList handleEnterDebate={this.handleEnterDebate} debates={debates} handleAcceptChallenge={this.handleChallengeResponse(true)} handleDeclineChallenge={ this.handleChallengeResponse(false) } user={loggedInUser} challenges={ challenges }/>) }
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
                        </div>
                    </section>
                </div>

                <DebateModal handleSubscribeToggle={this.handleSubscribeToggle} questions={topic.questions} handleEndDebate={ this.handleEndDebate } user={this.state.loggedInUser} handleNewMessage={this.handleNewMessage} debate={ this.state.debateModal.debate }/>

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

export default ProfilePage;
