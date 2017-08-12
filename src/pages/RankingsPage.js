import React from 'react';
import NavBar from '../components/NavBar';
import { countVoteTypes, hasVotesFilter, factualRankings, emotionalRankings, findRank } from '../utilities/rankings';

const RankingsPage = React.createClass({

    getInitialState() {
        return {
            user: {},
            statements: [],
            view: 'factual',
        }
    },

    componentWillMount() {
        if(initialState) {
            this.setState(initialState);
        }
    },

    handleNext() {
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
    },

    render() {
        const { user, statements, view } = this.state;

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
                        <div className="my-rank-num">
                            <p className="my-rank">{ view == 'factual' ? (factualRank ? '#' + factualRank : 'N/A') : (emotionalRank ? '#' + emotionalRank : 'N/A')}</p>
                        </div>
                        <div className="top-ranks">
                            <div className="rank-content">
                                { view == 'factual' && (<div>
                                <h2><img src="images/best-debater.png" className="m0" style={{maxHeight:"28px"}}/> Most Factual Debater</h2>
                                { factualStatements.length == 0 && (<p className="mt4 center">Waiting for more votes.</p>) }
                                <div className="rank-container">
                                    { topFactualStatement && (
                                        <div className="first-place">
                                            <div className="rank-item"><span className="rank-number">1</span> { topFactualStatement.user.username }</div>
                                        </div>
                                    )}
                                    <div className="clearfix" style={{minHeight: "520px"}}>
                                        <div className="col col-6 pr1">
                                            <ul>
                                                { factualStatements.slice(0,13).map((d, i) => {
                                                    return (<li className="rank-item" key={i}><span className="rank-number">{ i + 2 }</span> { d.user.username }</li>)
                                                }) }
                                            </ul>
                                        </div>
                                        <div className="col col-6 pl1">
                                            <ul>
                                                { factualStatements.slice(13,24).map((d, i) => {
                                                    return (<li className="rank-item" key={i}><span className="rank-number">{ i + 15 }</span> { d.user.username }</li>)
                                                }) }
                                            </ul>
                                        </div>
                                    </div>
                                </div></div>) }
                                { view == 'emotional' && (<div>
                                    <h2><i className="fa fa-hand-peace-o" aria-hidden="true" /> Most <span className="coexist mr2"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span><span className="I">I</span><span className="N">N</span><span className="G">G</span></span>
                                        Debater</h2>
                                    { emotionalStatements.length == 0 && (<p className="mt4 center">Waiting for more votes.</p>) }
                                    <div className="rank-container">
                                        { topEmotionalStatement && (
                                            <div className="first-place">
                                                <div className="rank-item"><span className="rank-number">1</span> { topEmotionalStatement.user.username }</div>
                                            </div>
                                        )}
                                        <div className="clearfix" style={{minHeight: "520px"}}>
                                            <div className="col col-6 pr1">
                                                <ul>
                                                    { emotionalStatements.slice(0,13).map((d, i) => {
                                                        return (<li className="rank-item" key={i}><span className="rank-number">{ i + 2 }</span> { d.user.username }</li>)
                                                    }) }
                                                </ul>
                                            </div>
                                            <div className="col col-6 pl1">
                                                <ul>
                                                    { emotionalStatements.slice(13,24).map((d, i) => {
                                                        return (<li className="rank-item" key={i}><span className="rank-number">{ i + 15 }</span> { d.user.username }</li>)
                                                    }) }
                                                </ul>
                                            </div>
                                        </div>
                                    </div></div> )}
                                <div className="next-buttons col-md-12 col-sm-12">
                                    <div className="col-md-6 col-sm-6">
                                        <button className="back" onClick={ this.handleBack }>Back</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <button className="next" onClick={ this.handleNext }>Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

export default RankingsPage;