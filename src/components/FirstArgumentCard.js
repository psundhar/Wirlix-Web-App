import React from 'react';
import TimeElapsedString from './TimeElapsedString';

export default ({ debate, handleReplyClick, user }) => {
    const {statement = {}, challengee } = debate;
    let profileLink, profileImage;

    let showNotification = false;

    if(challengee) {
        profileLink = "/profile/" + statement.user;

        if(user._id == challengee._id && !debate.challengeeRead) {
            showNotification = true;
        }
    }

    if(user._id == debate.challenger._id && !debate.challengerRead) {
        showNotification = true;
    }

    const showImage = statement.user == user._id;

    if(showImage) {
        profileImage = user.image || 'img/pexels-photo-103123.jpeg';
    }

    return (
        <div className="my-debate col-md-6 col-md-offset-3 no-response">
            <div className="username">
                <div className="flex">
                    { showImage && (<a className="pic" href={ profileLink } style={{background: "url(" + profileImage + ") center center no-repeat"}}></a>) }
                    <a className="un" href={profileLink}>{ challengee.username }</a>
                </div>
            </div>
            <p className="comment-preview">{ statement.text }</p>
            <p><button type="button" className="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#view-debate" onClick={ () => handleReplyClick(debate) }>Reply</button></p>
            <p className="time-posted">{ showNotification && (<span className="small mr1" style={{color: "crimson"}}><i className="glyphicon glyphicon-envelope" /></span>) }<TimeElapsedString elapsed={ debate.updated } /></p>
        </div>
    );
};