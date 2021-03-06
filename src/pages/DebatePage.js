import React from 'react';
import MyDebates from '../components/MyDebates';
import FlippableDebateCard from '../components/FlippableDebateCard';
import NavBar from '../components/NavBar';
import DebateModal from '../components/DebateModal';
import apiFetch from '../utilities/apiFetch';
import IO from 'socket.io-client';
import { registerSocketEventHandler } from '../utilities/realTime';
import { getDebate } from '../utilities/data';
import EndDebateOverlay from '../components/EndDebateOverlay';

import { connect } from 'react-redux';
import { updateDebate, updateDebateAction, deleteDebate, subscribeToDebate } from '../actionCreators/debateActionCreators';

const mapStateToProps = state => {
    return {
        debates: state.debates,
        topic: state.topic,
        user: state.users.find(u => u._id == state.authUserId),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        refreshDebate: (data) => {
            getDebate(data._id, json => {
                dispatch(updateDebateAction(json));
            });
        },

        viewDebate: (debateId) => {
            dispatch(updateDebate(debateId, {viewed: true}));
        },

        handleSubscribeToggle: function(debateId) {
            dispatch(subscribeToDebate(debateId));
        },

        endDebate: (debateId) => {
            dispatch(deleteDebate(debateId));
        },
    };
};

const DebatePage = React.createClass({
    getInitialState() {
        return {
            modalDebate: {},
            showEndDebateMessage: false,
            showEndDebateMessageFadeOut: false,
            showMyDebates: false,
        }
    },

    componentDidMount() {
        const socket = IO();

        registerSocketEventHandler(socket, 'updates:debates', this.props.refreshDebate);
    },

    handleEnterDebate(debate) {
        this.setState({ modalDebate: debate });

        this.props.viewDebate(debate._id);
    },

    handleMyDebatesClick() {
        this.setState({showMyDebates: !this.state.showMyDebates});
    },

    handleEndDebate(debateObj) {
        this.setState({showEndDebateMessage: true});

        setTimeout(() => {
            this.setState({ showEndDebateMessageFadeOut: true});
        }, 3000);

        this.props.endDebate(debateObj._id);
    },

    render: function() {
        const { showEndDebateMessage, showEndDebateMessageFadeOut, showMyDebates, modalDebate } = this.state;
        const { topic, user, debates } = this.props;

        const myDebates = debates.filter((d) => {
            return d.challenger._id == user._id || d.challengee._id == user._id;
        });

        const anythingUnread = myDebates.find(d => {
            return (d.challenger._id == user._id && !d.challengerRead) || (d.challengee._id == user._id && !d.challengeeRead);
        })

        return (
    <div>
    <section className="debate-section" style={{minHeight:"1400px"}}>
        <div className="grad1">
        <NavBar user={ user }/>
        <div className="response">
            <div className="container">
           {/* <h1 className="main-question col-md-12" id="debate-prompt">{ topic.prompt }</h1>*/}
                <div className="dummyTopic">{ topic.prompt }</div>
        <div className="col-md-4 col-md-offset-4 my-debates-button" style={{marginBottom:"70px"}}>
            <div className="animated bounce">Click here for your challenges</div>
            <button className="col-md-12 my-debates-button-link" onClick={ this.handleMyDebatesClick }>My Debates</button>
            { anythingUnread && (<div style={{width: "15px", height: "15px", borderRadius: "15px", boxShadow: "0px 1px 2px black", left:"5px", top: "5px", position: "relative", backgroundColor: "crimson"}}></div>) }
        </div>
        </div>
        </div>

        { showMyDebates && (<div className="container"><div className="col-md-6 col-md-offset-3"><MyDebates handleReplyClick={this.handleEnterDebate} debates={ myDebates } user={ user }/></div></div>) }
        </div>
        <div className="comments">
            <div className="container">
            <div className="border decide">
            {/*<ul  className="nav nav-pills">
                <li className="active col-xs-12">
                <a  href="#factual" data-toggle="tab" >Best Debates</a>
                </li>
                <li className="col-xs-12"><a href="#middle" data-toggle="tab">Live Right Now</a></li>
                <li className="col-xs-12"><a href="#emotional" data-toggle="tab">Subscribed</a></li>
            </ul>*/}
            
            <div  className="nav nav-pills">
                <h2 className="col-md-12"  style={{marginBottom:"20px", borderBottom:"2px solid darkgray", fontFamily: 'Source Code Pro', color:"#292C2D"}}><br/>All Debates</h2>
                <div className="debates col-md-12 live-debates">
                    { debates.sort((a,b) => {
                        if(a.updated < b.updated) {
                            return 1;
                        }
                        return -1;
                    }).map((d, i) => {
                        return (
                            <FlippableDebateCard key={i} user={user} handleSubscribeToggle={this.props.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                        )
                    })}
                </div>
            </div>
            
            
            
            <div className="tab-content">
            
            
            
            
               { /*<div className="col-md-4 vote-col factual active" id ="factual">
                <h2 className="col-md-12"  style={{marginBottom:"90px", fontFamily: 'Source Code Pro', color:"#292C2D"}}><img src="images/eye-b.png" /><br/>Most Viewed</h2>
                    <div className="debates col-md-12" id="best-debates-list">
                        { debates.filter((d) => {
                            return d.views > 10;
                        }).map((d, i) => {
                            return (
                                <FlippableDebateCard key={i} user={user} handleSubscribeToggle={this.props.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                            )
                        })}
                    </div>
                </div>*/ }

       { /*<div className="col-md-4 vote-col middle" id ="middle">
            <h2 className="col-md-12"  style={{marginBottom:"90px", fontFamily: 'Source Code Pro', color:"#292C2D"}}><br/>Live Right Now</h2>
            <div className="debates col-md-12 live-debates">
                { debates.filter((d) => {
                    return Date.parse(d.updated) >= (Date.now() - 600000) //10 minutes ago
                }).sort((a,b) => {
                    if(a.updated < b.updated) {
                        return 1;
                    }
                    return -1;
                }).map((d, i) => {
                    return (
                        <FlippableDebateCard key={i} user={user} handleSubscribeToggle={this.props.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                    )
                })}
            </div>
    
            
        </div>*/ }

    
        <div className="col-md-12 vote-col middle" id ="middle">
            <h2 className="col-md-12"  style={{marginBottom:"40px", marginTop:"90px", borderBottom:"2px solid darkgray", fontFamily: 'Source Code Pro', color:"#292C2D"}}><br/>All Debates</h2>
            <div className="debates col-md-12 live-debates">
                                  { /*  <p style={{color:"black"}}>click on the cards to view conversations</p>*/}
                { debates.sort((a,b) => {
                    if(a.updated < b.updated) {
                        return 1;
                    }
                    return -1;
                }).map((d, i) => {
                    return (
                        <FlippableDebateCard key={i} user={user} handleSubscribeToggle={this.props.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                    )
                })}
            </div>
    
            
        </div>

            
       { /*<div className="col-md-4 vote-col emotional" id = "emotional">
            <h2 className="col-md-12"  style={{marginBottom:"90px", fontFamily: 'Source Code Pro', color:"#292C2D"}}><img src="images/check-mark-b.png" /><br/>Subscribed Debates</h2>
            <div className="debates col-md-12" id="subscribed-debates-list">
                { debates.filter((d) => {
                    return d.subscribers.includes(user._id);
                }).map((d,i)=> {
                    return (
                        <FlippableDebateCard key={i} user={user} handleSubscribeToggle={this.props.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                    )
                })}
            </div>
        </div>*/}

        </div>
        </div>
        </div>
        </div>
        {/*<div className="overlay"></div>*/}
        </section>


        <DebateModal handleSubscribeToggle={this.props.handleSubscribeToggle} questions={topic.questions} handleEndDebate={this.handleEndDebate} user={user} debate={ modalDebate } />
        { showEndDebateMessage && (<EndDebateOverlay fadeOut={ showEndDebateMessageFadeOut }/>) }

            </div>)

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DebatePage);