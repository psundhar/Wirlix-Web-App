import React, { Component } from 'react';
import TempPopup from './TempPopup';
import TimeElapsedString from './TimeElapsedString';

class StatementCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showChallengesSent: false,
        }
    };

    render() {
        const {showChallenge, loggedInUser, user, topic, voters, text, handleVote, _id, handleChallenge,createdDate, heartExplode} = this.props;

      //  const border = agreement == 'disagree' ? '3px solid #990000' : '3px solid #006600';

        const profileLink = "/profile/" + user._id;

        const loggedInUsersVote = voters.find(v => v.user == loggedInUser._id);

        const userImage = user.image || "/images/pexels-photo-103123.jpeg";

        let date='test    ';

        if(createdDate){
            date = createdDate;
        }

        return (
            <div className="comment speechStatementCard" >
                    <div className="fullScreenStatementCard">
                      <div className="col-md-12 speech redborder" style={{borderRadius:"30px", marginBottom:"15px"}}>
                            <p >
                                {text} 
            {/*
                                { showChallenge &&(<button type="button" className="full-debate" href="#" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" onClick={ () => handleChallenge(_id, topic._id)}><b> CHALLENGE! &#8250;</b></button>)}
            */}
                            </p>
                       </div>

                       <div className="col-md-12">
                            <div className="col-md-4">
                                <a className="profile-pic" href={ profileLink } style={{background: "url(" + userImage + ") center center no-repeat" }}></a> <a href={ profileLink } className="username" style={{color:"black"}}>{ user.firstName }</a>
                            </div>
                            <div className="fullScreenVoteButtons col-md-8">
                                <div className="col-md-4 button-container">
                                    <button className={ "voteButton button-vote up facts " + ((loggedInUsersVote && loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(true, _id) } style={{margin:"0px", padding:"0px"}}><img src="images/best-debater.png" /> &nbsp; <span className="vote-num">{ voters.filter(v => v.isRational).length }</span></button>
                                </div>
                                <div className="col-md-4">
                                     { showChallenge &&(<button type="button" className="voteButtonChallenge pulse" href="#" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" onClick={ () => handleChallenge(_id, topic._id)} style={{margin:"0px", padding:"0px"}}><img src="images/challenge.png" /></button>)}
                                </div>

                                <div className="col-md-4 button-container" style={{paddingLeft:"0px"}}>

                                    <button className={ "voteButton button-vote down hearts " + ((loggedInUsersVote && !loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(false, _id) }  style={{margin:"0px", padding:"0px"}}><img src="images/heart-b.png"/>  &nbsp; <span className="vote-num">{ voters.filter(v => !v.isRational).length }</span></button>

                                </div>
                            </div>
                        </div>

                        <div className="mobileScreenVoteButtons col-md-4">
                            <div className="button-container" style={{display:"inline-block"}}>
                                <button className={ "voteButton button-vote up facts " + ((loggedInUsersVote && loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(true, _id) } style={{margin:"0px", padding:"0px"}}><img src="images/best-debater.png" /> &nbsp; <span className="vote-num">{ voters.filter(v => v.isRational).length }</span></button>
                            </div>
                            <div style={{display:"inline-block"}}>
                                { showChallenge &&(<button type="button" className="voteButtonChallenge pulse" href="#" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" onClick={ () => handleChallenge(_id, topic._id)} ><img src="images/challenge.png" /></button>)}
                            </div>

                            <div className="button-container" style={{display:"inline-block"}}>

                                <button className={ "voteButton button-vote down hearts " + ((loggedInUsersVote && !loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(false, _id) }  style={{margin:"0px", padding:"0px"}}><img src="images/heart-b.png"/>  &nbsp; <span className="vote-num">{ voters.filter(v => !v.isRational).length }</span></button>

                            </div>                  
                        </div>   
                      </div>          
                            
                      <div className="mobileScreenStatementCard">      
                        <div >
                            <p className="col-md-12 speech redborder" style={{borderRadius:"30px"}} >
                                {text} 
            {/*
                                { showChallenge &&(<button type="button" className="full-debate" href="#" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" onClick={ () => handleChallenge(_id, topic._id)}><b> CHALLENGE! &#8250;</b></button>)}
            */}
                            </p>
                            </div>
                            <a className="profile-pic" href={ profileLink } style={{background: "url(" + userImage + ") center center no-repeat" }}></a> <a href={ profileLink } className="username" style={{color:"black"}}>{ user.firstName }</a> <br/>

                            <div className="fullScreenVoteButtons col-md-12">
                                <div className="col-md-4 button-container">
                                    <button className={ "voteButton button-vote up facts " + ((loggedInUsersVote && loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(true, _id) } style={{margin:"0px", padding:"0px"}}><img src="images/best-debater.png" /> &nbsp; <span className="vote-num">{ voters.filter(v => v.isRational).length }</span></button>
                                </div>
                                <div className="col-md-4">
                                { showChallenge &&(<button type="button" className="voteButtonChallenge pulse" href="#" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" onClick={ () => handleChallenge(_id, topic._id)} style={{margin:"0px", padding:"0px"}}><img src="images/challenge.png" /></button>)}
                                </div>

                                <div className="col-md-4 button-container">

                                    <button className={ "voteButton button-vote down hearts " + ((loggedInUsersVote && !loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(false, _id) }  style={{margin:"0px", padding:"0px"}}><img src="images/heart-b.png"/>  &nbsp; <span className="vote-num">{ voters.filter(v => !v.isRational).length }</span></button>

                                </div>
                            </div>

                                <div className="mobileScreenVoteButtons col-md-4">
                                <div className="button-container" style={{display:"inline-block"}}>
                                    <button className={ "voteButton button-vote up facts " + ((loggedInUsersVote && loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(true, _id) } style={{margin:"0px", padding:"0px"}}><img src="images/best-debater.png" /> &nbsp; <span className="vote-num">{ voters.filter(v => v.isRational).length }</span></button>
                                </div>
                                <div style={{display:"inline-block"}}>
                                { showChallenge &&(<button type="button" className="voteButtonChallenge pulse" href="#" data-toggle="modal" data-target="#challenge-conf" aria-hidden="true" onClick={ () => handleChallenge(_id, topic._id)} ><img src="images/challenge.png" /></button>)}
                                </div>

                                <div className="button-container" style={{display:"inline-block"}}>

                                    <button className={ "voteButton button-vote down hearts " + ((loggedInUsersVote && !loggedInUsersVote.isRational) ? "clicked" : "") } onClick={ () => handleVote(false, _id) }  style={{margin:"0px", padding:"0px"}}><img src="images/heart-b.png"/>  &nbsp; <span className="vote-num">{ voters.filter(v => !v.isRational).length }</span></button>

                                </div>
                            </div> 
                      </div>                                 
                            
            </div>
           
        );
    };
}

export default StatementCard;