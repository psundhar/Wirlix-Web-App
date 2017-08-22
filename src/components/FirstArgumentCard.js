import React from 'react';
import TimeElapsedString from './TimeElapsedString';

export default ({ debate, handleReplyClick, user }) => {
    const {statement = {}, challengee ,challenger,_id} = debate;
    let profileLink, profileImage,challengerImage,challengerLink;

    let showNotification = false;

    if(challengee) {
        profileLink = "/profile/" + statement.user;


        if(user._id == challengee._id && !debate.challengeeRead) {
            showNotification = true;
        }
    }
if(challenger){
    challengerLink="/profile/" + debate.challenger._id;
}
    /*if(user._id == debate.challenger._id && !debate.challengerRead) {
        showNotification = true;
    }*/

    const showImage = statement.user == debate.challengee._id;
    const displayImage=debate.challenger._id;
   // console.log(displayImage);

    if(showImage ) {
        profileImage = debate.challengee.image || '/images/pexels-photo-103123.jpeg';
      //  console.log(profileImage);

    }
    if(displayImage){
        challengerImage = debate.challenger.image || '/images/pexels-photo-103123.jpeg';
       //console.log(challengerImage);
 }

    return (

        <div className="my-debate no-response clearfix">
            <div className="username">
                <div className="flex">
                    { showImage && (<a className="pic" href={ profileLink } style={{background: "url(" + profileImage + ") center center no-repeat"}}></a>) }
                    <a className="un" href={profileLink}>{ challengee.username }</a>
                </div>
                <div className="flex">
                    { displayImage && (<a className="pic" href={challengerLink}  style={{background: "url(" + challengerImage + ") center center no-repeat"}}></a>) }
                    <a className="un" href={challengerLink}>{challenger.username}</a>
            </div>
            <p className="comment-preview">{ statement.text }</p>
            <p><button type="button" className="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#view-debate" onClick={ () => handleReplyClick(debate) }>Reply</button></p>

                <p className="time-posted"><span className="small mr1" style={{color: "crimson"}}>{ showNotification && ( <i className="glyphicon glyphicon-envelope" />) }</span> </p><span className="small ml1"><TimeElapsedString elapsed={debate.updated} /></span>
        </div>
        </div>
    );
};