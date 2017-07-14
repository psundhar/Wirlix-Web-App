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
                return (
                    <div className="notification" key={i}>
                        { c.challengee.username } vs. { c.challenger.username }
                    </div>
                )
            })}
        </div>
    )
};

export default ChallengeNotificationsList;