import React from 'react';

const profileLinkStyles = {
    display: "inline",
    textDecoration: "underline",
    fontSize: "1em",
};

const ChallengeNotificationsList = ({challenges, debates, user, handleAcceptChallenge, handleDeclineChallenge, handleEnterDebate }) => {
    return (
        <div className="notifications col-md-12" id="profile-notifications">
            <h3>Notifications</h3>
            { challenges.map((c,i)=> {
                const isChallenger = user._id == c.challenger._id;

                const thisDebate = debates.find(d => d.statement && d.statement._id == c.statement._id && d.challenger._id == c.challenger._id && d.challengee._id == c.challengee._id);

                return (
                    <div className="notification rounded" key={i}>
                        <div className="p1">
                            { isChallenger ? 'You' : (<a style={profileLinkStyles} href={ "/profile/" + c.challenger._id }>{c.challenger.username}</a>) } challenged { !isChallenger ? 'you' : (<a style={profileLinkStyles} href={ "/profile/" + c.challengee._id }>{c.challengee.username}</a>) } to debate
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