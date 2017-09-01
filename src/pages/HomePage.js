import React from 'react';
import StatementCard from '../components/StatementCard';
import apiFetch from '../utilities/apiFetch';
import NavBar from '../components/NavBar';
import ChallengeDialog from '../components/ChallengeDialog';
import TempPopup from '../components/TempPopup';
import HideShow from '../components/HideShow';
import { registerSocketEventHandler } from '../utilities/realTime';
import IO from 'socket.io-client';
import { getStatement } from '../utilities/data';
import ReactTooltip from 'react-tooltip';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateStatementAction, createStatement, voteOnStatement } from '../actionCreators/statementActionCreators';
import { createChallenge } from '../actionCreators/challengeActionCreators';

const MIN_VOTES = 1;


const numVoters = (voters, filterFn) => {
    return voters.filter(filterFn).length;
};

const numRational = (voters) => {
    return numVoters(voters, (v) => {
        return v.isRational;
    });
};

const numEmotional = (voters) => {
    return numVoters(voters, (v) => {
        return !v.isRational;
    });
};

const sortOutcome = (a, b, primaryQualifier, secondaryQualifier = null) => {
    if(primaryQualifier(a) > primaryQualifier(b)) {
        return -1;
    }
    else if(primaryQualifier(a) < primaryQualifier(b)) {
        return 1;
    }
    else if(secondaryQualifier) {
        return secondaryQualifier(a) >= secondaryQualifier(b) ? -1 : 1;
    }

};
var hocus = document.getElementsByClassName("right");


const heartExplode = () => {
    console.log(Carousel.prototype.getActiveIndex);
    console.log();
   
    
    $(".hearts").on("click", function() {

        console.log("inside jq");
        var b = Math.floor((Math.random() * 100) + 1);
        var d = ["flowOne", "flowTwo", "flowThree"];
        var a = ["colOne", "colTwo", "colThree", "colFour", "colFive", "colSix"];
        var c = (Math.random() * (1.6 - 1.2) + 1.2).toFixed(1);
        $('<div class="heart part-' + b + " " + a[Math.floor((Math.random() * 6))] + '" style="font-size:' + Math.floor(Math.random() * (50 - 22) + 22) + 'px;"><i class="fa fa-heart"></i></div>').appendTo(this).css({
            animation: "" + d[Math.floor((Math.random() * 3))] + " " + c + "s linear"
        });
        $(".part-" + b).show();
        setTimeout(function() {
            $(".part-" + b).remove()
        }, c * 1100);
        setTimeout(function() {
            hocus[0].click();
        }, 1500);
        
    });
};

const factExplode = () => {
    console.log("outside jq");
    $(".facts").click(function() {
        console.log("inside jq");
        var b = Math.floor((Math.random() * 100) + 1);
        var d = ["flowOne", "flowTwo", "flowThree"];
        var a = ["colOne", "colTwo", "colThree", "colFour", "colFive", "colSix"];
        var c = (Math.random() * (1.6 - 1.2) + 1.2).toFixed(1);
        var d = 
        $('<div class="heart part-' + b + " " + a[Math.floor((Math.random() * 6))] + '" style="font-size:' + Math.floor(Math.random() * (50 - 22) + 22) + 'px;"><i class="fa fa-smile-o"></i></div>').appendTo(this).css({
            animation: "" + d[Math.floor((Math.random() * 3))] + " " + c + "s linear"
        });
        $(".part-" + b).show();
        setTimeout(function() {
            $(".part-" + b).remove()
        }, c * 1100);
         setTimeout(function() {
            hocus[0].click();
        }, 1500);
    });
};



const mapStateToProps = state => {
    const user = state.users.find(u => u._id == state.authUserId);

    return {
        user,
        topic: state.topic,
        statements: state.statements,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshStatement: (statement) => {
            dispatch(updateStatementAction(statement));
        },
        addStatement: (statement, user) => {
            dispatch(createStatement(statement, user));
        },
        handleVote: (isRational, statementId) => {
            if(isRational==true){
                heartExplode();
            }
            else {
                factExplode();
            }
            dispatch(voteOnStatement(statementId, isRational));


        },
        handleConfirm(statementId, topicId, user) {
            // Make api call to create a challenge and then update state
            dispatch(createChallenge(statementId, topicId, user));
        },
    };
};

const HomePage = React.createClass({

    getInitialState() {
        return {
            statementText: '',
            challenge: {
                statementId: null,
                topicId: null,
            },
            showChallengeSent: false,
            interval: false,
            indicators: false,
            controls: false,
            hiddens: true
        };
    },

    componentDidMount() {
        // Connect to server via websocket for live updates

        registerSocketEventHandler(IO(), 'updates:opinions', this.getUpdatedStatement);
    },

    getUpdatedStatement(data) {
        getStatement(data._id, json => {
            this.props.refreshStatement(json);
        });
    },

    handleStatementTextChange(e) {
        this.setState({ statementText: e.target.value });
    },


    handleVote(isRational, statementId) {
        const statements = this.state.statements;

        if(isRational==true){
            heartExplode();
        }
        else {
            factExplode();
        }
        const s = statements.find(s => s._id == statementId);
       
        if(s) {

            apiFetch('/api/statements/' + s._id, 'PUT', {isRational})
            .catch((err) => {
                console.log(err);
            });

            const existingVote = s.voters.find(v => v.user == this.state.user._id);

            if(existingVote) {
                existingVote.isRational = isRational;
            }
            else {
                s.voters.push({ user: this.state.user._id, isRational });

            }

            this.setState({ statements });
            
        }

       
    },



    handleSubmit() {
        if(this.state.statementText.length == 0) {
            return; // Don't submit empty statements
        }

        this.props.addStatement({
            topic: this.props.topic._id,
            text: this.state.statementText,
          //  agreement: agree ? 'agree' : 'disagree',
  /*      })
        .then((res) => {
            that.setState({ statementText: '' });
            return res.json();
        })
        .then(statement => {
            const statements = that.state.statements;
            statement.user = this.state.user;
            statements.push(statement);
            that.setState({ statements });
        })
        .catch(function(err) {
            console.log(err);
        })

            agreement: agree ? 'agree' : 'disagree',*/
        }, this.props.user);

        this.setState({ statementText: '' }); // Clear out statement text

    },

    handleChallenge(statementId, topicId) {
        this.setState({
            challenge: {statementId, topicId}
        });
    },

    handleCancel() {
        this.setState({
            challenge: { statementId: null, topicId: null }
        });
    },

    handleConfirm(statementId, topicId, user) {
        console.log("HERE");
        this.props.handleConfirm(statementId, topicId, user);

        this.setState({showChallengeSent: true});

        setTimeout(() => {
            this.setState({showChallengeSent: false});
        }, 2500);
    },

    handleShow(){

       $("#factual").show('slide', {
             direction: 'up'
             }, 4000);
        
         $("#emotional").show('slide', {
             direction: 'down'
             }, 4000);
         setTimeout(function(){ 
            console.log("jellloo");
            $(".comment-container").show('slide', {
             direction: 'up'
             }, 500);

        }, 8000);
        this.setState({hiddens: false});

    },

    handleHide(){
       $("#emotional").hide('slide', {
             direction: 'down'
             }, 4000);
       $("#factual").hide('slide', {
             direction: 'up'
             }, 4000);
       setTimeout(function(){ 
            console.log("jellloo");
            $(".comment-container").hide('slide', {
             direction: 'down'
             }, 4000);

        }, 8000);
        this.setState({hiddens: true});
    },


    render() {


       // const { topic, user, statements } = this.state;

        const { topic, user, statements } = this.props;

        const opinion=this.state.statementText.length!=0;



        return (
        <div>
        <div className="main-section-home" style={{background: "url(../images/red-fade-bg1.png) center center no-repeat", backgroundSize: "cover", position: "relative"}}>
            { Object.keys(user).length > 0 && (<NavBar user={ user } />) }
            {/*<div className="button-home-arrow" >
                <div className="arrow animated bounce">
                    <a className="border-less" href="#"><img src="images/arrow-w.png" style={{width:"40px", height:"40px"}}/></a>
                </div>
            </div>*/}


            {/*<div className="button-home col-md-4" style={{ position: "absolute" }}>
                <a href="#"><span style={{fontSize: "1.4em", fontFamily: 'Source Code Pro'}}>What's Trending</span></a>
            </div>*/}
            
            <div className="dummyTopic">{ topic.prompt }</div>
           

                <video controls playsInline autoPlay muted loop poster="" id="bgvid">
                    <source src="video/1 North Korea.mp4" type="video/mp4" />
                     <source src="video/wirlix_promo_video_v1.webm" type="video/webm" />
                </video>

               {/* <div className="mute">
                    <img src="images/sound.png" />
                </div>
                <div className="control">
                    <img src="images/pause.png" />
                </div>*/}
           
        </div>
            
        <section className="news-section" id="cont-section"  style={{backgroundColor:"#FFFFFF"}}>
        { /*    <div className="response"> */}
                <div className="container" style={{paddingRight:"0px", paddingLeft:"0px", marginRight:"0px", marginLeft:"0px", width:"100%"}}>
                   {/* <h1 className="main-question col-md-12">{ topic.prompt }</h1>*/}
                   <div className="opinionQuestion" style={{marginTop:"85px"}}><p>What is your opinion?</p></div>

                    <div className="opinionbox col-md-8 col-md-offset-2" style={{marginTop:"10px"}}>
                        <textarea className="col-md-12 col-xs-12 col-sm-12" style={{color:"black", backgroundColor:"white"}} placeholder="What's your first opinion?" onChange={ this.handleStatementTextChange } value={ this.state.statementText }></textarea>
                        <p className="homepagetooltip" data-tip="First Arguments are the user’s original stance on the controversy without discussing, debating or learning more about the controversy ">?</p>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                        <div className="res-button res-buttoncent  agr">
                            {opinion ? <button className="ghost" onClick={ this.handleSubmit }><span style={{fontFamily: "Raleway", alignItems:"center"}}>Submit</span></button>:
                                <button data-toggle="modal" data-target="#opinion-conf" onClick={ this.handleSubmit }><span style={{fontFamily: "Raleway"}}>Submit</span></button> }
                        </div>
                    </div> 
                    <div id="statement_carousel" style={{marginTop: "60px", paddingTop:"60px", borderTop:"2px solid darkgray"}}>
                    {/*<p style={{fontSize:"1.2em", textAlign: "center", marginBottom:"30px"}}>These opinions need your wisdom and support!!</p>*/}
                        <div style={{backgroundColor:"#292C2D"}}><p style={{ textAlign: "center", fontSize:"2em", padding:"30px", color:"white", fontFamily:"Source Code Pro", fontWeight:"200"}}>YOU DECIDE</p></div>
                        <p style={{ textAlign: "center", fontSize:"12px", paddingBottom:"15px", color:"black", fontFamily:"Source Code Pro"}}>Vote for these opinions</p>
                        <Carousel
                            indicators = {this.state.indicators}
                            interval = {this.state.interval}>
                            { statements.filter(s => s.voters <=0  && numRational(s.voters)<=MIN_VOTES  && numEmotional(s.voters) <=MIN_VOTES || (s.voters) && numRational(s.voters) > MIN_VOTES && numEmotional(s.voters) > MIN_VOTES)
                                .sort((a, b) => {
                                    return a.created >= b.created ? -1 : 1;
                                })
                                .map(s => {
                                    return (
                                        <Carousel.Item>
                                            <div style={{width: "335px"}}>
                                        <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.props.handleVote} showChallenge={ user._id != s.user._id } createdDate={s.created} { ...s }/>
                                            </div>
                                        </Carousel.Item>
                                    )
                                })}
                        </Carousel>

                    </div>
    
                <div style={{height:"120px", width:"100%", backgroundColor:"#DBD9D9", paddingLeft:"50px", paddingRight:"50px", marginBottom:"50px"}}>
                  <div className="col-md-4"><img src="images/best-debater.png" style={{height:"40px", width:"40px"}} /><br /><p style={{color:"black"}}>Vote as Factually Appealing</p></div> 
                  <div className="col-md-4"><img style={{height:"40px", width:"40px"}} src="images/challenge.png" /><br /><p style={{color:"black"}}>Challenge the opinion</p></div>
                  <div className="col-md-4"><img  src="images/heart-b.png" style={{height:"40px", width:"40px"}} /><br /><p style={{color:"black"}}>Vote as Emotionally Appealing</p></div>
                </div>
                                   
          { /*        </div> */}
            {
                !this.state.hiddens
                ? <HideShow color="white" backgroundColor="black"><button className="hideo" onClick={ () => this.handleHide() }>HIDE</button>  </HideShow>
                :  <HideShow  color="white" backgroundColor="black"> <button className="hideo" onClick={ () => this.handleShow() }>SHOW</button>  </HideShow>
            }         
         
            </div>
                         
                               
                                   
            <div className="comments">
                                   
                <div className="container" style={{paddingLeft:"0px", paddingRight:"0px", marginLeft:"0px", marginRight:"0px", width:"100%" }}>
                
                    <div className="border decide">

                        <ul  className="nav nav-pills">
                            <li className="active">
                                <a  href="#factual" data-toggle="tab">Factual</a>
                            </li>
                            <li ><a href="#emotional" data-toggle="tab">Emotional</a></li>
                           
                        </ul>

                        <div className="tab-content">

                            <div className="col-md-6 vote-col factual active" id ="factual" style={{paddingLeft:"0px", paddingRight:"0px"}}>
                                <h2 className="col-md-12" style={{backgroundColor:"#292C2D", padding:"0px",marginTop:"0px", marginBottom:"0px"}}><span data-tip="These arguments are more appealing to people's logic" style={{marginRight:"20px", marginLeft:"20px", color:"white"}}>Most Factual</span><img src="images/best-debater-w.png"/></h2>
                                    <ReactTooltip place="top" type="dark" effect="float"/>

                                <div className="comment-container col-md-12" style={{paddingLeft:"100px", paddingRight:"100px"}}>
                                    { statements.filter(s => s.voters && numRational(s.voters) >= MIN_VOTES && numRational(s.voters) >= numEmotional(s.voters))
                                        .sort((a, b) => {
                                            return sortOutcome(a, b, s => numRational(s.voters), s => s.voters.length );
                                        })
                                        .map((s, i) => {
                                        return (
                                            <StatementCard key={i} handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.props.handleVote} showChallenge={ user._id != s.user._id } createdDate={s.created}{ ...s }/>
                                        )
                                    })}

                                </div>
                            </div>

                            

                            <div className="col-md-6 vote-col emotional" id = "emotional" style={{paddingLeft:"0px", paddingRight:"0px"}}>
                                <h2 className="col-md-12" style={{backgroundColor:"#292C2D", padding:"0px", marginTop:"0px", marginBottom:"0px"}}><span data-tip="These arguments are more appealing to people's emotions">Most Emotional</span><img style= {{height: "48px", width:"48px"}}src="images/heart-w.gif" /></h2>
                                <ReactTooltip place="top" type="dark" effect="float"/>
                                    
                                <div className="comment-container col-md-12" style={{paddingLeft:"100px", paddingRight:"100px"}}>
                                    { statements.filter(s => s.voters && numEmotional(s.voters) >= MIN_VOTES && numEmotional(s.voters) >= numRational(s.voters))
                                        .sort((a, b) => {
                                            return sortOutcome(a, b, s => numEmotional(s.voters), s => s.voters.length);
                                        })
                                        .map(s => {
                                        return (
                                            <StatementCard handleChallenge={ this.handleChallenge } loggedInUser={user} handleVote={this.props.handleVote} showChallenge={ user._id != s.user._id } createdDate={s.created} { ...s } />

                                        )
                                    })}

                                </div>
                            </div>
                            
                        </div>
                    </div>
                  
                </div>
            </div>
            {/*<div className="overlay">
            </div>*/}
        </section>
        <ChallengeDialog handleCancel={this.handleCancel} handleConfirm={this.handleConfirm} topicId={ this.state.challenge.topicId } statementId={ this.state.challenge.statementId } user={ user } />
        <TempPopup show={ this.state.showChallengeSent } color="white" backgroundColor="crimson"><div className="center bold">Challenge Sent!</div></TempPopup>
            <div id ="opinion-conf" className="modal fade in" data-toggle="opinion" role="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <p id="modalpar">Please Enter your opinion</p>

                            <div id="modalbut" className="cancel">
                                <button data-dismiss="modal" onClick={ () => handleCancel() }>X</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
