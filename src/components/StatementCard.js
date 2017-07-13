import React from 'react';

export default ({showChallenge, user, topic, voters, text, agreement, handleVote, _id}) => {
    const border = agreement == 'disagree' ? '3px solid crimson' : '3px solid slateblue';

    const profileLink = "/profile/" + user._id;
    return (
        <div className="comment">
            <p className="col-md-12" style={{border}}>
                <a className="profile-pic" href={ profileLink } style={{background: "url(/images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href={ profileLink } className="username">{ user.username }</a> <br/>
                {text} { showChallenge && (<i className="fa fa-plus-circle challenge" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true"/>) }
            </p>
            <div className="col-md-6 button-container">
                <button className="button-vote up" onClick={ () => handleVote(true, _id) }><img src="images/factual-w.png"/> <span className="vote-num">{ voters.filter(v => v.isRational).length }</span></button>
            </div>
            <div className="col-md-6 button-container">
                <button className="button-vote down" onClick={ () => handleVote(false, _id) }><img src="images/emotional-w.png" /><span className="vote-num">{ voters.filter(v => !v.isRational).length }</span></button>
            </div>
        </div>
    );
};