import React from 'react';
import MyDebates from '../components/MyDebates';
import FlippableDebateCard from '../components/FlippableDebateCard';
import NavBar from '../components/NavBar';
import DebateModal from '../components/DebateModal';
import apiFetch from '../utilities/apiFetch';

const DebatePage = React.createClass({
    getInitialState() {
        return {
            debates: [],
            topic: {},
            user: {},
            debateModal: {debate: {}},
            showEndDebateMessage: false,
        }
    },

    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);
        }
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

    handleEnterDebate(debate) {
        const { debates, user } = this.state;

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

    handleEndDebate(debateObj) {
        const debates = this.state.debates;

        const indexToDelete = debates.findIndex(d => d._id == debateObj._id);

        if(indexToDelete > -1) {
            delete debates[indexToDelete];
        }

        this.setState({debates, });

        apiFetch('/api/debates/' + debateObj._id, 'DELETE');
    },

    render: function() {
        return (
    <div>
    <section className="debate-section">
        <NavBar user={ this.state.user }/>
        <div className="response">
            <div className="container">
            <h1 className="main-question col-md-12" id="debate-prompt">{ this.state.topic.prompt }</h1>
        <div className="col-md-4 col-md-offset-4 my-debates-button">
            <a className="col-md-12" href="#">My Debates</a>
        </div>
        </div>
        </div>

        <MyDebates handleReplyClick={this.handleNewMessage} handleEnterDebate={this.handleEnterDebate} debates={ this.state.debates } userId={ this.state.user._id}/>
        <div className="comments">
            <div className="container">
            <div className="border decide">
            <ul  className="nav nav-pills">
                <li className="active col-xs-12">
                <a  href="#factual" data-toggle="tab">Best Debates</a>
                </li>
                <li className="col-xs-12"><a href="#middle" data-toggle="tab">Live Right Now</a></li>
                <li className="col-xs-12"><a href="#emotional" data-toggle="tab">Subscribed</a></li>
            </ul>
            <div className="tab-content">
            <div className="col-md-4 vote-col factual active" id ="factual">
            <h2 className="col-md-12"><img src="images/eye-w.png" /><br/>Best Debates</h2>
            <div className="debates col-md-12" id="best-debates-list">
                { this.state.debates.filter((d) => {
                    return d.views > 10;
                }).map((d, i) => {
                    return (
                        <FlippableDebateCard key={i} user={this.state.user} handleSubscribeToggle={this.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                    )
                })}
            </div>
        </div>

        <div className="col-md-4 vote-col middle" id ="middle">
            <h2 className="col-md-12"><br/>Live Right Now</h2>
            <div className="debates col-md-12 live-debates">
                { this.state.debates.filter((d) => {
                    return Date.parse(d.updated) >= (Date.now() - 600000) //10 minutes ago
                }).map((d, i) => {
                    return (
                        <FlippableDebateCard key={i} user={this.state.user} handleSubscribeToggle={this.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                    )
                })}
            </div>
        </div>

        <div className="col-md-4 vote-col emotional" id = "emotional">
            <h2 className="col-md-12"><img src="images/check-mark.png" /><br/>Subscribed Debates</h2>
        <div className="debates col-md-12" id="subscribed-debates-list">
            { this.state.debates.filter((d) => {
                return d.subscribers.includes(this.state.user._id);
            }).map((d,i)=> {
                return (
                    <FlippableDebateCard key={i} user={this.state.user} handleSubscribeToggle={this.handleSubscribeToggle} debate={d} handleEnterDebate={this.handleEnterDebate} />
                )
            })}
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        <div className="overlay"></div>
        </section>

        <DebateModal handleEndDebate={this.handleEndDebate} user={this.state.user} handleNewMessage={this.handleNewMessage} debate={this.state.debateModal.debate} />
        { this.state.showEndDebateMessage && (<div className="end-message">
            <p className="quote">Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.</p>
            <p className="coexist"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span></p>
        </div>) }
            <div id="rankings" className="modal fade" role="dialog">
            <div className="modal-dialog">
        <div className="modal-content">
            <div className="my-ranking">
            <p className="my-info"><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a> Priyanka Sundhar</p>
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
            </div>)

    },
});

export default DebatePage;