import React from 'react';
import TimeElapsedString from './TimeElapsedString';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import { createDebateMessage } from '../actionCreators/debateActionCreators';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        handleNewMessage: (debate, text, isModerator = false) => {
            dispatch(createDebateMessage(debateId, text, isModerator));
        },
    };
};

const DebateModal = React.createClass({

    getInitialState() {
        return {
            text: '',
            showEndDebateDialog: false,
            showEndDebateMessage: false,
        };
    },

    handleReplyTextChange(e) {
        this.setState({text: e.target.value });
    },

    handleQuestionClick(num) {
        const { handleNewMessage, debate, questions } = this.props;
        handleNewMessage(debate, questions[num.toString()], true);
    },

    render() {
        const { handleNewMessage, debate = {}, user, handleEndDebate, handleSubscribeToggle } = this.props;

        const { statement, challenger = {}, challengee = {}, messages = [], views, subscribers = [] } = debate;

        const challengerImage = challenger.image || '/images/pexels-photo-103123.jpeg';
        const challengeeImage = challengee.image || '/images/pexels-photo-103123.jpeg';

        const isChallenger = user._id == challenger._id;
        const isChallengee = user._id == challengee._id;

        const isParticipant = isChallenger || isChallengee;
        const isSubscriber = subscribers.includes(user._id);

        return (
            <div id="view-debate" className="modal fade" role="dialog" style={{backgroundColor: "black"}}>
                <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor: "rgba(255,255,255, .8)"}}>
                        <div className="chat-header clearfix">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <div className="user-img">
                                    <p><a href={ "/profile/" +  challengee._id } style={{background: "url(" + challengeeImage + " ) center center no-repeat"}}></a></p>
                                    <p>{ challengee.username }</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <div className="user-img">
                                    <p><a href={ "/profile/" +  challenger._id } style={{background: "url(" + challengerImage + " ) center center no-repeat"}}></a></p>
                                    <p>{ challenger.username }</p>
                                </div>
                            </div>
                            <div className="vote-bar">
                                <div className="vote-amt">
                                    <p><img src="/images/eye-b.png"/> { views }</p>
                                </div>
                                <div className="vote-amt">
                                    <p><img src="/images/check-mark-b.png"/> { subscribers.length }</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-box">
                            { statement && (
                                <div className="message-box dis-message">
                                    <div className="username">
                                        <p><a href={"/profile/" + challengee._id}
                                              style={{background: "url(" + challengeeImage + ") center center no-repeat"}}></a>
                                        </p>
                                    </div>
                                    <p className="message">{ statement.text }</p>
                                    <p className="time-posted"><TimeElapsedString elapsed={statement.created} /></p>
                                </div>
                            )}
                            { messages.map(m => {
                                const isChallenger = m.user == challenger._id;
                                const isChallengee = m.user == challengee._id;

                                let profileImage = "/images/pexels-photo-103123.jpeg";
                                let profileLink;

                                if(m.moderator) {
                                    profileImage = "/images/Wirlix_InvertedLogo.png";
                                }
                                else if(isChallenger) {
                                    profileImage = challengerImage;
                                }
                                else if(isChallengee) {
                                    profileImage = challengeeImage;
                                }

                                if(m.moderator) {
                                    profileLink = null;
                                }
                                else {
                                    profileLink = "/profile/" + m.user;
                                }

                                return (
                                    <div className={ "message-box " + ( isChallenger ? "agr-message" : "dis-message" )  }>
                                        <div className="username">
                                            <p><a href={profileLink}
                                                  style={{background: "url(" + profileImage + ") center center no-repeat"}}></a>
                                            </p>
                                        </div>
                                        <p className="message">{ m.text }</p>
                                        <p className="time-posted"><TimeElapsedString elapsed={m.created} /></p>
                                    </div>
                                );
                            }) }
                        </div>
                        { isParticipant && (
                            <div className="reply-box col-md-12">
                                <textarea placeholder="Write your opinion...." onChange={this.handleReplyTextChange} value={this.state.text}></textarea>
                                <div className="col-md-4 col-sm-4 col-xs-4 end-button">
                                    <button className="end-debate" onClick={() => this.setState({ showEndDebateDialog: true })}>End Debate</button>
                                </div>
                                <div className="col-md-8 col-sm-8 col-xs-8 reply-button">
                                    <button className="reply-submit" onClick={ () => { if(this.state.text.length > 0) handleNewMessage(debate, this.state.text); this.setState({text: ''}); } }>Reply</button>
                                </div>
                            </div>
                        )}
                        <div className="vote-box col-md-12">
                            <div className="col-md-6 col-md-offset-3">
                                <p onClick={ () => handleSubscribeToggle(debate._id) }><i className={ "fa fa-check " + ( isSubscriber ? 'checked' : '' ) } /> Subscribe</p>
                            </div>
                        </div>
                        <div className="close-bottom">
                            <button type="button" style={{width:"50px", height:"50px"}} className="btn btn-default" data-dismiss="modal"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                        </div>
                        { this.state.showEndDebateDialog && (<div className="end-confirm">
                            <p>Are you sure you want to end this debate?</p>
                            <div className="cancel col-md-6 col-sm-6 col-xs-6">
                                <button onClick={ () => this.setState({showEndDebateDialog: false})}>No</button>
                            </div>
                            <div className="confirm col-md-6 col-sm-6 col-xs-6">
                                <button href="#" data-toggle="modal" data-target="#view-debate" onClick={ (e) => {
                                    this.setState({showEndDebateDialog: false});
                                    handleEndDebate(debate);
                                }}>Yes</button>
                            </div>
                        </div>) }
                    </div>
                    { isParticipant && (
                        <div className="q-container">
                            <div className="question-box one">
                        
                                <p className="number" data-tip="Click to get the first question from Wirlix team to give structure to your debate" onClick={ () => this.handleQuestionClick(1) }>1</p>
                    <ReactTooltip place="top" type="dark" effect="float"/>
                            </div>
                            <div className="question-box two">
                                <p className="number" data-tip="Click to get the second question from Wirlix team to give structure to your debate" onClick={ () => this.handleQuestionClick(2) }>2</p>
                                <ReactTooltip place="top" type="dark" effect="float"/>
                            </div>
                            <div className="question-box three">
                                <p className="number" data-tip="Click to get the third question from Wirlix team to give structure to your debate" onClick={ () => this.handleQuestionClick(3) }>3</p>
                                <ReactTooltip place="top" type="dark" effect="float"/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DebateModal);
