import React from 'react';
import TimeElapsedString from './TimeElapsedString';

export default ({ debate, handleReplyClick, user }) => {
    const {statement = {}, challengee } = debate;
    let profileLink, profileImage;

    if(challengee) {
        profileLink = "/profile/" + statement.user
    }

    const showImage = statement.user == user._id;

    if(showImage) {
        profileImage = user.image || 'img/pexels-photo-103123.jpeg';
    }

    return (
        <div className="my-debate col-md-6 col-md-offset-3 no-response">
            <div className="username">
                <p>
                    { showImage && (<a className="pic" href={ profileLink } style={{background: "url(" + profileImage + ") center center no-repeat"}}></a>) }
                    <a className="un" href={profileLink}>{ challengee.username }</a>
                </p>
            </div>
            <p className="comment-preview">{ statement.text }</p>
            <p><button type="button" className="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#view-debate" onClick={ () => handleReplyClick(debate) }>Reply</button></p>
            <p className="time-posted"><TimeElapsedString elapsed={ statement.created } /></p>
        </div>
    );
};