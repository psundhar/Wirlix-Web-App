import React from 'react';

export default ({ debate, handleReplyClick }) => {
    const {statement = {}, challengee } = debate;
    return (
        <div className="my-debate col-md-6 col-md-offset-3 no-response">
            <div className="username">
                <p><a className="pic" href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a> <a className="un" href="profile.html">{ challengee.username }</a></p>
            </div>
            <p className="comment-preview">{ statement.text }</p>
            <p><button type="button" className="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#view-debate" onClick={ () => handleReplyClick(debate) }>Reply</button></p>
            <p className="time-posted">25m</p>
        </div>
    );
};