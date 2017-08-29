import React from 'react';
import NavBar from '../components/NavBar';
import { countVoteTypes, hasVotesFilter, factualRankings, emotionalRankings, findRank } from '../utilities/rankings';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    const user = state.users.find(u => u._id == state.authUserId);

    return {
        user,
      //  topic: state.topic,
        statements: state.statements,
    };
};

const RankingsPage = React.createClass({

    getInitialState() {
        return {
           // user: {},
           // statements: [],
            view: 'factual',
            view1:'emotional',
        }
    },

    componentWillMount() {
        if(initialState) {
            this.setState(initialState);
        }
    },

    /*handleNext() {
        const { view } = this.state;

        if(view == 'factual') {
            this.setState({view: 'emotional'});
        }
    },

    handleBack() {
        const { view } = this.state;

        if(view == 'emotional') {
            this.setState({view: 'factual'});
        }
    },*/

    render() {
        const {  view } = this.state;
        const { user, statements } = this.props;

        const cachedVoteStatements = countVoteTypes(statements.filter(hasVotesFilter));

        const factualStatements = factualRankings([...cachedVoteStatements]);

        const emotionalStatements = emotionalRankings([...cachedVoteStatements]);

        const factualRank = findRank(factualStatements, user._id);

        const emotionalRank = findRank(emotionalStatements, user._id); // Set these vars before shifts below

        const topFactualStatement = factualStatements.shift();
        const topEmotionalStatement = emotionalStatements.shift();

        const profileImage = user.image || "images/pexels-photo-103123.jpeg";

        return (
            <section className="rankings-section pb4">
                <NavBar user={user}/>
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#CCCCCC" }}>
                        <div className="my-ranking">
                            <p className="my-info"><a href={"/profile/" + user._id } style={{background: "url(" + profileImage + ") center center no-repeat"}}></a> { user.username }</p>
                        </div>
                        <div className="top-ranks">

                                        <div className="rank-content">
                                            {view == 'factual' && (<div>
                                                <div className="my-rank-num ">
                                                    <p className="my-rank">My Rank
                                                        : {view == 'factual' ? (factualRank ? '#' + factualRank : 'N/A') : 'N/A'}</p>
                                                </div>
                                                <h2><img src="images/best-debater.png" className="m0"
                                                         style={{maxHeight: "28px"}}/> Most Factual Debater</h2>
                                                {/*<p style={{fontSize:"15px", textAlign: "center"}}> Rank on the basis of votes received for factual arguments </p>*/}
                                                {factualStatements.length == 0 && (
                                                    <p className="mt4 center">Waiting for more votes.</p>)}
                                                <div className="rank-container">
                                                    {topFactualStatement && (
                                                        <div className="first-place">
                                                            <div className="rank-item animated bounceOut"><span
                                                                className="rank-number">1</span> {topFactualStatement.user.username}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="clearfix" style={{minHeight: "520px"}}>
                                                        <div className="col col-6 pr1">
                                                            <ul>
                                                                {factualStatements.slice(0, 13).map((d, i) => {
                                                                    return (<li className="rank-item" key={i}><span
                                                                        className="rank-number">{i + 2}</span> {d.user.username}
                                                                    </li>)
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className="col col-6 pl1">
                                                            <ul>
                                                                {factualStatements.slice(13, 24).map((d, i) => {
                                                                    return (<li className="rank-item" key={i}><span
                                                                        className="rank-number">{i + 15}</span> {d.user.username}
                                                                    </li>)
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                            }
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

export default connect(mapStateToProps)(RankingsPage);

//export default RankingsPage;