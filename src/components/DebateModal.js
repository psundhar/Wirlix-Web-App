import React from 'react';

const DebateModal = React.createClass({

    getInitialState() {
        return {
            text: '',
            showEndDebateDialog: false,
            showEndDebateMessage: false,
            visibleQuestions: {
                1: false,
                2: false,
                3: false,
            },
        };
    },

    handleReplyTextChange(e) {
        this.setState({text: e.target.value });
    },

    handleQuestionClick(num) {
        const visibleQuestions = this.state.visibleQuestions;

        visibleQuestions[num] = !visibleQuestions[num];

        this.setState({
            visibleQuestions
        });
    },

    render() {
        const { visibleQuestions } = this.state;
        const {handleNewMessage, debate, user, handleEndDebate } = this.props;
        const { statement, challenger = {}, challengee = {}, messages = [], views, subscribers = [] } = debate;

        const challengerImage = challenger.image || '/images/pexels-photo-103123.jpeg';
        const challengeeImage = challengee.image || '/images/pexels-photo-103123.jpeg';

        const isChallenger = user._id == challenger._id;
        const isChallengee = user._id == challengee._id;

        const isParticipant = isChallenger || isChallengee;

        return (
            <div id="view-debate" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="chat-header col-md-12">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <div className="user-img">
                                    <p><a href="profile.html" style={{background: "url(" + challengeeImage + " ) center center no-repeat"}}></a></p>
                                    <p>{ challengee.username }</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <div className="user-img">
                                    <p><a href="profile.html" style={{background: "url(" + challengerImage + " ) center center no-repeat"}}></a></p>
                                    <p>{ challenger.username }</p>
                                </div>
                            </div>
                            <div className="vote-bar">
                                <div className="vote-amt">
                                    <p><img src="/images/eye-b.png" /> { views }</p>
                                </div>
                                <div className="vote-amt">
                                    <p><img src="/images/check-mark-b.png" /> { subscribers.length }</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-box">
                            { statement && (
                                <div className="message-box dis-message">
                                    <div className="username">
                                        <p><a href="profile.html"
                                              style={{background: "url(/images/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                        </p>
                                    </div>
                                    <p className="message">{ statement.text }</p>
                                    <p className="time-posted">25m</p>
                                </div>
                            )}
                            { messages.map(m => {
                                const isChallenger = m.user == challenger._id;

                                return (
                                    <div className={ "message-box " + ( isChallenger ? "agr-message" : "dis-message" )  }>
                                        <div className="username">
                                            <p><a href="profile.html"
                                                  style={{background: "url(/images/pexels-photo-103123.jpeg) center center no-repeat"}}></a>
                                            </p>
                                        </div>
                                        <p className="message">{ m.text }</p>
                                        <p className="time-posted">25m</p>
                                    </div>
                                );
                            }) }
                        </div>
                        { isParticipant && (<div className="reply-box col-md-12">
                            <textarea placeholder="Write your opinion...." onChange={this.handleReplyTextChange} value={this.state.text}></textarea>
                            <div className="col-md-4 col-sm-4 col-xs-4 end-button">
                                <button className="end-debate" onClick={() => this.setState({ showEndDebateDialog: true })}>End Debate</button>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8 reply-button">
                                <button className="reply-submit" onClick={ () => { handleNewMessage(debate, this.state.text); this.setState({text: ''}); } }>Reply</button>
                            </div>
                        </div>) }
                        <div className="close-bottom">
                            <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
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
                        <div className="end-overlay">

                        </div>
                    </div>
                    <div className="q-container">
                        <div className="question-box one">
                            <p className="number" onClick={ () => this.handleQuestionClick(1) }>1</p>
                        </div>
                        <div className="question-box two">
                            <p className="number" onClick={ () => this.handleQuestionClick(2) }>2</p>
                        </div>
                        <div className="question-box three">
                            <p className="number" onClick={ () => this.handleQuestionClick(3) }>3</p>
                        </div>
                    </div>
                    { visibleQuestions[1] && (<div onClick={ () => this.handleQuestionClick(1)}className="question one">
                        <div className="message-box question-box one">
                            <div className="username">
                                <p className="wirlix-img" style={{background: "url(/images/Wirlix_InvertedLogo.png) center center no-repeat"}}></p>
                            </div>
                            <p className="message">this is question #1</p>
                        </div>
                    </div>) }
                    { visibleQuestions[2] && (<div onClick={ () => this.handleQuestionClick(2)}className="question two">
                        <div className="message-box question-box one">
                            <div className="username">
                                <p className="wirlix-img" style={{background: "url(/images/Wirlix_InvertedLogo.png) center center no-repeat"}}></p>
                            </div>
                            <p className="message">this is question #2</p>
                        </div>
                    </div>) }
                    { visibleQuestions[3] && (<div onClick={ () => this.handleQuestionClick(3)}className="question three">
                        <div className="message-box question-box one">
                            <div className="username">
                                <p className="wirlix-img" style={{background: "url(/images/Wirlix_InvertedLogo.png) center center no-repeat"}}></p>
                            </div>
                            <p className="message">this is question #3</p>
                        </div>
                    </div>) }
                </div>
            </div>
        );
    }
});

export default DebateModal;
