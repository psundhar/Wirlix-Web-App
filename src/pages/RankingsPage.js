import React from 'react';
import NavBar from '../components/NavBar';

const RankingsPage = React.createClass({

    getInitialState() {
        return {
            user: {},
            statements: []
        }
    },

    componentWillMount() {
        if(initialState) {
            this.setState(initialState);
        }
    },

    render() {
        const popularStatements = this.state.statements.filter(s => s.voters.length > 0);

        const cachedVoteStatements = popularStatements.map((s) => {
            s.rational = s.voters.filter(v => v.isRational).length;
            s.emotional = s.voters.length - s.rational;
            return s;
        });

        const factualDebaters = cachedVoteStatements.sort((a,b) => {
            if(a.rational > b.rational) {
                return -1;
            }
            return 1;
        });

        const topFactualDebater = factualDebaters.shift();

        return (
            <section className="rankings-section pb4">
                <NavBar user={this.state.user}/>
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#CCCCCC" }}>
                        <div className="my-ranking">
                            <p className="my-info"><a href="profile.html" style={{background: "url(images/pexels-photo-103123.jpeg) center center no-repeat"}}></a> Priyanka Sundhar</p>
                        </div>
                        <div className="my-rank-num">
                            <p className="my-rank">#434</p>
                        </div>
                        <div className="top-ranks">
                            <div className="factual rank-content">
                                <h2><img src="images/best-debater.png" /> Most Factual Debater</h2>
                                <div className="rank-container">
                                    { topFactualDebater && (
                                        <div className="first-place">
                                            <div className="rank-item"><span className="rank-number">1</span> { topFactualDebater.user.username }</div>
                                        </div>
                                    )}
                                    <div className="clearfix" style={{minHeight: "520px"}}>
                                        <div className="col col-6 pr1">
                                            <ul>
                                                { factualDebaters.slice(0,13).map((d, i) => {
                                                    return (<li className="rank-item" key={i}><span className="rank-number">{ i + 2 }</span> { d.user.username }</li>)
                                                }) }
                                            </ul>
                                        </div>
                                        <div className="col col-6 pl1">
                                            <ul>
                                                { factualDebaters.slice(13,24).map((d, i) => {
                                                    return (<li className="rank-item" key={i}><span className="rank-number">{ i + 2 }</span> { d.user.username }</li>)
                                                }) }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="next-buttons col-md-12 col-sm-12">
                                    <div className="col-md-6 col-sm-6">
                                        <button className="back">Back</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <button className="next">Next</button>
                                    </div>
                                </div>
                            </div>
                            <div className="emotional rank-content">
                                <h2><i className="fa fa-hand-peace-o" aria-hidden="true"></i> Most <span className="coexist"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span><span className="I">I</span><span className="N">N</span><span className="G">G</span></span>
                                    Debater</h2>
                                <div className="rank-container">
                                    <div className="first-place">
                                        <div className="rank-item"><span className="rank-number">1</span> John Appleseed</div>
                                    </div>

                                    <div className="clearfix">
                                        <div className="col col-6 pr1">
                                            <ul>
                                                <li className="rank-item"><span className="rank-number">2</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">3</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">4</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">5</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">6</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">7</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">8</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">9</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">10</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">11</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">12</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">13</span> John Appleseed</li>
                                            </ul>
                                        </div>
                                        <div className="col col-6 pl1">
                                            <ul>
                                                <li className="rank-item"><span className="rank-number">14</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">15</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">16</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">17</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">18</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">19</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">20</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">21</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">22</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">23</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">24</span> John Appleseed</li>
                                                <li className="rank-item"><span className="rank-number">25</span> John Appleseed</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="next-buttons col-md-12 col-sm-12">
                                    <div className="col-md-6 col-sm-6">
                                        <button className="back">Back</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <button className="next">Next</button>
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