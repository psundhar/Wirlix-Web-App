import React from 'react';

// {/*<div className="notification">*/}
//     {/*<p><a href="#">Username</a> challenged you to a debate</p>*/}
// {/*</div>*/}
// {/*<div className="notification">*/}
//     {/*<p><a href="#">Username</a> replied to your debate</p>*/}
// {/*</div>*/}
// {/*<div className="notification">*/}
//     {/*<p><a href="#">Username</a> subscribed to your debate</p>*/}
// {/*</div>*/}
// {/*<div className="notification">*/}
//     {/*<p><a href="#">Username</a> rated your argument factual</p>*/}
// {/*</div>*/}
// {/*<div className="notification">*/}
//     {/*<p><a href="#">Username</a> responded to the debate <a href="#">debate name</a>*/}
// {/*</p>*/}
// {/*</div>*/}
// {/*<div className="notification">*/}
//     {/*<p>A new question has been chosen in the debate <a href="#">debate name</a></p>*/}
// {/*</div>*/}
const ChallengeNotificationsList = ({challenges, debates, user, handleAcceptChallenge, handleDeclineChallenge, handleEnterDebate }) => {

    return (
        <div className="notifications col-md-12">
            <h3>Notifications</h3>
            { challenges.map((c,i)=> {
                const isChallenger = user._id == c.challenger._id;

                const thisDebate = debates.find(d => d.statement && d.statement._id == c.statement._id && d.challenger._id == c.challenger._id && d.challengee._id == c.challengee._id);

                return (
                    <div className="notification" key={i}>
                        <div className="p1">
                            { isChallenger ? 'you' : c.challenger.username } challenged { !isChallenger ? 'you' : c.challengee.username } to debate
                        </div>
                        <div>
                            { c.status == 'accepted' && (<span className="mr2">Challenge accepted! <button type="button" className="full-debate" href="#" data-toggle="modal" data-target="#view-debate" onClick={ () => handleEnterDebate(thisDebate) }>Enter Debate</button></span>)}
                            { c.status == 'declined' && (<span className="mr2">Challenge declined</span>)}
                            { isChallenger && c.status == 'pending' && (<span>Waiting for a response</span>) }
                            { !isChallenger && c.status == 'pending' && (<div><button className="mr2" onClick={ () => handleAcceptChallenge(c) }>Accept</button> <button onClick={ () => handleDeclineChallenge(c) } >Decline</button></div>) }
                        </div>

                    </div>
                )
            })}
        </div>
    )
};

export default ChallengeNotificationsList;