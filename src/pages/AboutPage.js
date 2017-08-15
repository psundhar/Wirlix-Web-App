import React from 'react';
import NavBar from '../components/NavBar';
import Typed from 'typed.js';
import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride.scss';
const AboutPage = React.createClass({

    getInitialState() {
        return {
            user: {},
            strings:[],
            joyrideSteps:[],
            isJoyrideRunning: false,
        }
    },


   /* componentDidMount(){
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);

        }
    },*/
    componentDidMount() {
        if(initialState) { // Globally set into hbs templates
            this.setState(initialState);

        }
        //const { strings } = this.props;
        const options = {
            strings: ["Launching this Fall.", "Stay tuned for our app"],
            typeSpeed: 100,
            //backSpeed: 50,
            loop:true,
        };
        this.typed = new Typed(this.el, options);

        this.setState({
            joyrideSteps: [
                {
                    title: 'Contact-Us',
                    text: 'More information and how to contact and get in touch with us',
                    selector: '.social-icons',
                    position: 'top',
                    type: 'hover',
                },
            ]
        });

},
    handleTutorialClick() {
               this.setState({isJoyrideRunning: true});
    },
    componentWillUnmount() {
        this.typed.destroy();
    },


    render() {
        const {user} = this.state;
        const { strings } = this.props;
       // this.typed = new Typed(this.el, options);


        return (
            <div>
                <Joyride
                ref="joyride"
                steps={this.state.joyrideSteps}
                run={this.state.isJoyrideRunning}
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
                <div className="main-section-home about">
                <NavBar user={ user } handleTutorialClick={ this.handleTutorialClick } />
                <div className="overlay">
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
                <div className="svg-cont">
                    <svg width="350px" height="350px" viewBox="0 0 403 384" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g id="LF" stroke="none" strokeWidth="1" fill="none" fillRule={"evenodd"}>
                            <g id="Desktop" transform="translate(-109.000000, -515.000000)" stroke="#FFFFFF" strokeWidth="15">
                                <path d="M113,720.83733 C113,720.83733 154.802034,742.575419 202.422155,663.696161 C202.422155,663.696161 218.342157,617.927271 219.806972,622.515669 C221.271786,627.104066 219.303488,888.93983 219.303488,888.93983 C219.282654,891.668067 219.183446,891.669555 219.082253,888.943303 C219.082253,888.943303 206.293274,543.420631 282.87883,557.197728 C282.87883,557.197728 311.313003,557.019648 284.422516,692.342144 C257.532029,827.664143 259.812834,808.506469 259.812834,808.506469 C260.135262,805.797579 261.138757,801.475061 262.042051,798.900598 C262.042051,798.900598 296.760096,700.000551 345.155036,647.497879 C393.54948,594.995703 424.082411,524.848784 424.082411,524.848784 C425.171225,522.347239 425.034813,522.282258 423.779329,524.703939 C423.779329,524.703939 308.869496,746.35477 324.493856,756.876337 C340.118216,767.397904 381.316566,719.565972 432.516133,680.239688 C483.7157,640.913405 503.320804,649.881365 503.562377,680.366675 C503.804446,710.851986 398.716759,879.252112 398.716759,879.252112" id="Page-1"></path>
                            </g>
                        </g>
                    </svg>
                    <p>Priyanka Sundhar</p>
                    <p>Founder of <span>W I R L I X</span></p>
                </div>

                <section className="about-more">
                    <div className="container">
                        <div className="container">
                            <div className="main-title-about">
                                <h1><span className ="typewriter" style={{ whiteSpace: 'pre' }}
                                          ref={(el) => { this.el = el; }} >{this.typed}</span>
                                    <span className="typed-cursor"></span></h1>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="ohoo">
                            {/*<div className="container">*/}
                                <div className="social-icons">
                                      <p><a href="#" ><i className="fa fa-facebook" aria-hidden="true"></i></a><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a><a href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a></p>
                                </div>
                                <p>Spark Controversy</p>
                                <p className="coexist"><span className="C">C</span><span className="O">O</span><span className="E">E</span><span className="X">X</span><span className="I">I</span><span className="S">S</span><span className="T">T</span></p>
                            </div>
                            </div>
                            {/*</div>*/}
                        </div>

                </section>
            </div>
        )

    },
});

export default AboutPage;









