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
const ChallengeNotificationsList = ({challenges, user}) => {

    return (
        <div className="notifications col-md-12">
            <h3>Notifications</h3>
            { challenges.map((c,i)=> {
                const isChallenger = user._id == c.challenger._id;

                return (
                    <div className="notification" key={i}>
                        <div className="p1">
                            { isChallenger ? 'you' : c.challenger.username } challenged { !isChallenger ? 'you' : c.challengee.username } to debate
                        </div>
                        <div>
                            { isChallenger && c.status == 'pending' && (<span>Waiting for a response</span>) }
                            { !isChallenger && c.status == 'pending' && (<div><button className="mr2">Accept</button> <button>Decline</button></div>) }
                        </div>

                    </div>
                )
            })}
        </div>
    )
};

export default ChallengeNotificationsList;