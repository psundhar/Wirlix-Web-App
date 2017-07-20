import React from 'react';
import FlippableDebateCard from '../components/FlippableDebateCard';
import NavBar from '../components/NavBar';
import ChallengeNotificationsList from '../components/ChallengeNotificationsList';
import apiFetch from '../utilities/apiFetch';
import DebateModal from '../components/DebateModal';

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
        };
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }
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

    handleNewMessage(debate, text) {
        const debates = this.state.debates;

        const newMessageDebate = debates.find(d => d._id == debate._id);

        const newMessageObj = {
            user: this.state.user._id,
            text,
        };

        newMessageDebate.messages.push(newMessageObj);

        this.setState({debates});

        // Update db state
        apiFetch('/api/debates/' + debate._id, 'PUT', {
            message: newMessageObj
        })
            .then(res => res.json())
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
            delete debates[indexToDelete];
        }

        const dIndexToDelete = challenges.findIndex(c => {
            return (c.challenger._id == debateObj.challenger._id) && (c.challengee._id == debateObj.challengee._id) && (c.statement._id == debateObj.statement._id)
        });

        if(dIndexToDelete > -1) {
            delete challenges[dIndexToDelete];
        }

        this.setState({debates, challenges, showEndDebateMessage: true});

        setTimeout(() => {
            this.setState({ showEndDebateMessage: false});
        }, 4000);

        apiFetch('/api/debates/' + debateObj._id, 'DELETE');
    },

    render() {
        const { user, statement, debates, loggedInUser, topic, challenges, debateModal } = this.state;

        const isMyProfile = loggedInUser._id == user._id;

        const profileImage = user.image || '/images/pexels-photo-103123.jpeg';

        return (
            <div>
                <div className="main-content profile" style={{minHeight:"1400px"}}>
                    <NavBar user={user}/>
                    <section className="profile-container">
                        <div className="container">
                            <div className="profile-pic col-md-4 col-md-offset-4">
                                <div className="pic-crop"
                                     style={{backgroundSize: "cover", background: "url(" + profileImage + ") center center no-repeat"}}></div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="profile-content col-md-8 col-md-offset-2">
                                <h2 className="profile-name">{ user.username }</h2>
                                <div className="scores">
                                    <div className="col-md-6">
                                        <p><img src="/images/best-debater-w.png"/> { statement.voters && statement.voters.filter(v => v.isRational).length }</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><img src="/images/peace.png" className="peace"/> { statement.voters && statement.voters.filter(v => !v.isRational).length }</p>
                                    </div>
                                </div>
                                <div className="qotd col-md-10 col-md-offset-1">
                                    <div className="gotd-banner">
                                        <h3 className="mb2">{ topic.prompt }</h3>
                                        { statement.agreement && (<div style={{backgroundColor: "white", border: "4px solid " + (statement.agreement == 'agree' ? 'slateblue' : 'crimson')}} className="p2">
                                            <h4 style={{color: 'black'}}>{ statement.text }</h4>
                                        </div>) }
                                    </div>
                                </div>

                                <div className="debates col-md-12">
                                    { debates.map((d, i) => {
                                        return (<FlippableDebateCard key={i} user={user} debate={ d } handleEnterDebate={ this.handleEnterDebate } />)
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

                <DebateModal questions={topic.questions} handleEndDebate={ this.handleEndDebate } user={this.state.loggedInUser} handleNewMessage={this.handleNewMessage} debate={ this.state.debateModal.debate }/>

                { this.state.showEndDebateMessage && (<div className="end-message" style={{display: "block", backgroundColor: "white"}}>
                    <p className="quote" style={{color: "black"}}>Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.</p>
                    <p className="coexist"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span></p>
                </div>) }

                <div id="rankings" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="my-ranking">
                                <p className="my-info"><a href="profile.html"
                                                          style={{background: "url(img/north-korea-image.jpg) center center no-repeat"}}></a>
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
