import React from 'react';
import TimeElapsedString from './TimeElapsedString';

const FlippableDebateCard = React.createClass({
    getInitialState() {
        return {
            frontVisible: true,
        }
    },

    flip() {
        this.setState({
           frontVisible: !this.state.frontVisible,
        });
    },

    render() {
        const { debate, user, handleSubscribeToggle,  handleEnterDebate} = this.props;
        const { statement = {}, challenger, challengee, views, subscribers, _id } = debate;

        const frontVisible = this.state.frontVisible;

        const subscribed = subscribers.includes(user._id);

        const challengerImage = challenger.image || '/images/pexels-photo-103123.jpeg';
        const challengeeImage = challengee.image || '/images/pexels-photo-103123.jpeg';

        const isChallenger = user._id == challenger._id;
        const isChallengee = user._id == challengee._id;

        // const classes = "debate " + ( !frontVisible ? 'Card-Back-Flip' : '' );

        return (
            <div className="debate">
                { frontVisible && (<div className={ "front " + (frontVisible ? 'Card-Front-Flip': '')}>
                    <div className="content"  onClick={ this.flip }>
                        <div className="flex justify-between">
                            <div>
                                <input type="checkbox" className="subscribe" style={{position:'absolute', top:'3%'}} onClick={e => e.stopPropagation()} onChange={ e => { e.stopPropagation(); handleSubscribeToggle(_id); } } checked={ subscribed }/>
                            </div>
                            <div className="flex justify-around flex-auto">
                                <div className="flex flex-column" style={{width: "40%"}}>
                                    <div className="mx-auto" style={{background: "url(" + challengerImage + ") center center no-repeat", backgroundSize: "cover", borderRadius:"100px", border: "2px white solid", width: "50px", height: "50px"}}></div>
                                    <p className="small">{ challenger.username }</p>
                                </div>
                                <div className="vs">
                                    <p>vs.</p>
                                </div>
                                <div className="flex flex-column" style={{width: "40%"}}>
                                    <div className="mx-auto" style={{background: "url(" + challengeeImage + ") center center no-repeat", backgroundSize: "cover", borderRadius:"100px", border: "2px white solid", width: "50px", height: "50px"}}></div>
                                    <p className="small">{ challengee.username }</p>
                                </div>
                            </div>
                            <span className="small" style={{color: "crimson"}}>{ ((isChallenger && !debate.challengerRead) || (isChallengee) && (!debate.challengeeRead)) && (<i className="glyphicon glyphicon-envelope" />) }</span>
                            <span className="small ml1"><TimeElapsedString elapsed={debate.updated} /></span>
                        </div>
                    </div>
                    <div className="clearfix mb3">
                        <div className="col-md-6">
                            <p className="view-amt debate-view"><img src="/images/eye-w.png" style={{margin: "0px"}} /> { views }</p>
                        </div>
                        <div className="col-md-6">
                            <p className="view-amt sub-debate"><img src="/images/check-mark.png" style={{margin: "0px"}} /> { subscribers.length }</p>
                        </div>
                    </div>
                </div>) }
                { !frontVisible && (
                    <div className={ "back Card-Back-Flip"} onClick={ this.flip } >
                        <div className="flex justify-between">
                            <div className="username mb2">
                                <div className="flex items-center">
                                    <a className="image mr3" onClick={e => e.stopPropagation()} href={ "/profile/" + challengee._id } style={{background: "url(" + challengeeImage + ") center center no-repeat"}}></a>
                                    <p>{ challengee.username }</p>
                                </div>
                            </div>
                            <span className="small"><TimeElapsedString elapsed={debate.updated} /></span>
                        </div>
                        <p className="pl2 pr2 small" style={{textAlign: "left"}}>{ statement.text }</p>
                        <p><button type="button" className="full-debate" href="#" data-toggle="modal" data-target="#view-debate" onClick={ e => { e.stopPropagation(); handleEnterDebate(debate); }}>Full Debate &#8250;</button></p>
                    </div>
                )}

            </div>
        );
    },
});

export default FlippableDebateCard;