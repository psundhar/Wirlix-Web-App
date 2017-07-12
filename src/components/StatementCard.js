import React from 'react';

export default ({user, topic, rational, emotional, text, agreement}) => {
    const border = agreement == 'disagree' ? '3px solid crimson' : '3px solid slateblue';

    const profileLink = "/profile/" + user._id;
    return (
        <div className="comment">
            <p className="col-md-12" style={{border}}>
                <a className="profile-pic" href={ profileLink } style={{background: "url(/images/pexels-photo-103123.jpeg) center center no-repeat" }}></a> <a href={ profileLink } className="username">{ user.username }</a> <br/>
                {text} <i className="fa fa-plus-circle challenge" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true"/>
            </p>
            <div className="col-md-6 button-container">
                <button className="button-vote up"><img src="images/factual-w.png"/> <span className="vote-num">{ rational }</span></button>
            </div>
            <div className="col-md-6 button-container">
                <button className="button-vote down"><img src="images/emotional-w.png" /><span className="vote-num">{ emotional }</span></button>
            </div>
        </div>
    );
};