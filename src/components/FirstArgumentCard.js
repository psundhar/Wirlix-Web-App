import React from 'react';
import TimeElapsedString from './TimeElapsedString';

export default ({ debate, handleReplyClick, user }) => {
    const {statement = {}, challengee ,challenger} = debate;
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
    const latestDebate=parseInt(debate.messages.length);
   // console.log("Array length" + latestDebate);

    return (

        <div className="my-debate no-response clearfix speechMyDebatesCard" style={{border:"1px solid black"}}>
            <div className="username">
                <div className="debater1 col-md-4">
                <div className="flex">
                    { showImage && (<a className="pic" href={ profileLink } style={{background: "url(" + profileImage + ") center center no-repeat"}}></a>) }
                    <a className="un" href={profileLink} style={{color:"black", padding:"10px"}}>{ challengee.username }</a>
                </div>
                </div>
                    <div className="col-md-4"> </div>

                <div className="debater2 col-md-4" >
                <div className="flex">
                    { displayImage && (<a className="pic" href={challengerLink}  style={{background: "url(" + challengerImage + ") center center no-repeat"}}></a>) }
                    <a className="un" href={challengerLink} style={{color:"black", padding:"10px"}}>{challenger.username}</a>
                </div>
            </div>

                { latestDebate <=1 ?<p className="comment-preview">{statement.text }</p>:
                    <p className="comment-preview">{debate.messages[latestDebate-1].text }</p>}
            <p><button type="button" className="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#view-debate" onClick={ () => handleReplyClick(debate) }>Reply</button></p>


                <p className="time-posted"><span className="small mr1" style={{color: "crimson"}}>{ showNotification && ( <i className="glyphicon glyphicon-envelope" />) }</span> </p><span className="small ml1" style={{color:"black"}}><TimeElapsedString elapsed={debate.updated} /></span>
        </div>
        </div>
    );
};