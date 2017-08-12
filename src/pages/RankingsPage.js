import React from 'react';
import NavBar from '../components/NavBar';
import Tabs from 'react-tabs-navigation';
import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride.scss';

const RankingsPage = React.createClass({

    getInitialState() {
        return {
            user: {},
            statements: [],
            view: 'factual',
            view1:'emotional',
            joyrideSteps: [],
        }

    },

    componentWillMount() {
        if(initialState) {
            this.setState(initialState);
        }
        this.setState({
            joyrideSteps: [
                {
                    title: 'Select Tabs to Check Emotional & Factual Ranks',
                    text: 'Rankings are updated every day ',
                    selector: '.modal-dialog',
                    position: 'bottom-left',
                    type:'hover',
                },

                {
                    title: 'User’s are ranked based on their first opinions',
                    text: 'This list displays the ranks of factual-debator',
                    selector: '.factual-rank-list',
                    position: 'top',
                    type: 'hover',
                },
                {
                    title: 'User’s are ranked based on their first opinions',
                    text: 'This is your Factual Rank',
                    selector: '.factual-rank',
                    position: 'top',
                    type: 'hover',
                },
            ],

        });

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
        const { user, statements, view ,view1} = this.state;

        const popularStatements = statements.filter(s => s.voters.length > 0);

        const cachedVoteStatements = popularStatements.map((s) => {
            s.rational = s.voters.filter(v => v.isRational).length;
            s.emotional = s.voters.length - s.rational;
            return s;
        });

        const factualStatements = [...cachedVoteStatements].filter(s => s.rational > 0).sort((a,b) => {
            if(a.rational > b.rational) {
                return -1;
            }
            return 1;
        });

        const emotionalStatements = [...cachedVoteStatements].filter(s => s.emotional > 0).sort((a,b) => {
            if(a.emotional > b.emotional) {
                return -1;
            }
            return 1;
        });

        const topFactualStatement = factualStatements.shift();
        const topEmotionalStatement = emotionalStatements.shift();

        const factualIndex = factualStatements.findIndex(s => s.user._id == user._id);
        console.log("test :"+factualStatements);
        const emotionalIndex = emotionalStatements.findIndex(s => s.user._id == user._id);

        let factualRank, emotionalRank;

        if(factualIndex > -1) {
            factualRank = factualIndex + 2;
        }

        if(emotionalIndex > -1) {
            emotionalRank = emotionalIndex + 2;
        }

        const profileImage = user.image || "images/pexels-photo-103123.jpeg";

        return (
            <div>
            <Joyride
                ref="joyride"
                steps={this.state.joyrideSteps}
                run={true}
                showOverlay={true}
                autoStart={true}
                locale={{
                    back: (<span>Back</span>),
                    close: (<span>Close</span>),
                    last: (<span>Last</span>),
                    next: (<span>Next</span>),
                    skip: (<span>Skip</span>),
                }}
                debug={true}
                type="continuous"
                callback={(obj) => console.log(obj)}
            />
            <section className="rankings-section pb4">
                <NavBar user={user}/>
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#CCCCCC" }}>
                        <div className="my-ranking">
                            <p className="my-info"><a id="dp" href={"/profile/" + user._id } style={{background: "url(" + profileImage + ") center center no-repeat"}}></a> { user.username }</p>
                        </div>
                        <div className="top-ranks">

                            <Tabs
                                tabs={[
                                    {
                                        children: () => (

                                            <div className="rank-content">
                                                { view == 'factual' && (<div>
                                                    <div className="my-rank-num ">
                                                        <p className="my-rank factual-rank">My Rank : { view == 'factual' ? (factualRank ? '#' + factualRank : 'N/A'): 'N/A'}</p>
                                                    </div>
                                                    <h2><img src="images/best-debater.png" className="m0" style={{maxHeight:"28px"}}/> Most Factual Debater</h2>
                                                    <p style={{fontSize:"15px", textAlign: "center"}}> Rank on the basis of votes received for factual arguments </p>
                                                    { factualStatements.length == 0 && (<p className="mt4 center">Waiting for more votes.</p>) }
                                                    <div className="rank-container factual-rank-list">
                                                        { topFactualStatement && (
                                                            <div className="first-place">
                                                                <div className="rank-item"><span className="rank-number">1</span> { topFactualStatement.user.username }</div>
                                                            </div>
                                                        )}
                                                        <div className="clearfix" style={{minHeight: "520px"}}>
                                                            <div className="col col-6 pr1">
                                                                <ul>
                                                                    { factualStatements.slice(0,13).map((d, i) => {
                                                                        return (<li className="rank-item" key={i}><span className="rank-number">{ i + 2 }</span> { d.user.username}</li>)
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
                                            </div>
                                        ),
                                        displayName: 'Most Factual Debater'
                                    },
                                    {
                                        children : () => (
                                            <div className="rank-content">
                                                { view1 == 'emotional' && (<div>
                                                    <div className="my-rank-num">
                                                        <p className="my-rank emotional-rank">My Rank : { view1 == 'emotional' ? (emotionalRank ? '#' + emotionalRank : 'N/A'): 'N/A'}</p>
                                                    </div>
                                                    <h2><i className="fa fa-hand-peace-o" aria-hidden="true" /> Most Emotional Debater</h2>

                                                    <p style = {{fontSize:"15px", textAlign: "center"}}>Rank on the basis of votes received for most emotional appeal</p>

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
                                            </div>
                                        ),
                                        displayName: 'Most Emotional Debater'
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }
});

export default RankingsPage;