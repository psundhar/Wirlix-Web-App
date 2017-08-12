import React from 'react';
import NavBar from '../components/NavBar';
import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride.scss';
import HomePage from '/Users/pooja/WebstormProjects/Wirlix-Web-App/src/pages/HomePage.js';
import DebatePage from '/Users/pooja/WebstormProjects/Wirlix-Web-App/src/pages/DebatePage.js';

const TutorialPage = React.createClass({


    getInitialState() {
        return {
            user: {},
            in: true,
            joyrideSteps:[],
            joyrideOverlay: true,
            joyrideType: 'continuous',
            isReady: false,
            isRunning: false,
            stepIndex: 0,
            selector: '',


        }
    },
    toggle(){
        return this.setState({ in: !this.state.in });
    },

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isReady: true,
                isRunning: true,
            });
        }, 1000);
        },

    addSteps(steps) {
        let newSteps = steps;

        if (!Array.isArray(newSteps)) {
            newSteps = [newSteps];
        }

        if (!newSteps.length) {
            return;
        }

        // Force setState to be synchronous to keep step order.
        this.setState(currentState => {
            currentState.steps = currentState.steps.concat(newSteps);
            return currentState;
        });
    },
    addTooltip(data) {
        this.joyride.addTooltip(data);
    },

    next() {
        this.joyride.next();
    },
    handleContinueClick() {
        const { isNewUser } = this.state;
        isNewUser ?  window.location = "/tutorial" : window.location =('/home');
    },

    handleCancel() {

    },
    callback(data) {
        console.log('%ccallback', 'color: #47AAAC; font-weight: bold; font-size: 13px;'); //eslint-disable-line no-console
        console.log(data); //eslint-disable-line no-console

        this.setState({
            selector: data.type === 'tooltip:before' ? data.step.selector : '',
        });
    },
    onClickSwitch(e) {
        e.preventDefault();
        const el = e.currentTarget;
        const state = {};

        if (el.dataset.key === 'joyrideType') {
            this.joyride.reset();

            setTimeout(() => {
                this.setState({
                    isRunning: true,
                });
            }, 300);

            state.joyrideType = e.currentTarget.dataset.type;
        }

        if (el.dataset.key === 'joyrideOverlay') {
            state.joyrideOverlay = el.dataset.type === 'active';
        }

        this.setState(state);
    },
        render() {
            const {user} = this.state;
            const fade=200;
            const {
                isReady,
                isRunning,
                joyrideOverlay,
                joyrideType,
                selector,
                stepIndex,
                steps,
            } = this.state;

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

                    <div className="main-section-home">
                        <NavBar user={ user }  />
                        {/*<div className="tutorial-heading">*/}
                            {/*<h1>Welcome to Wirlix</h1>*/}
                            {/*<p>Watch this video to understand our platform. Don’t skip this trust us it’s important.</p>*/}
                        {/*</div>*/}
                        <div className="overlay">
                        </div>
                        <div className="button-home col-md-4" style={{ position: "absolute" }}>
                            <a href="/home#cont-section">Join the Movement</a>
                        </div>
                        <div className="mute">
                            <img src="/images/sound.png"></img>
                        </div>
                        <div className="control">
                            <img src="/images/pause.png"></img>
                        </div>
                        <video playsInline autoPlay muted loop poster="" id="bgvid" className="about-vid">
                            <source src="/video/wirlix_promo_video_v1.mp4" type="video/mp4"></source>
                            <source src="/video/wirlix_promo_video_v1.webm" type="video/webm"></source>
                        </video>
                    </div>

                    </div>


                    );
        },
});

export default TutorialPage;