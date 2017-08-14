import React from 'react';
import NavBar from '../components/NavBar';

const TutorialPage = React.createClass({


    getInitialState() {
        return {
            user: {},
            in: true,

        }
    },
    toggle(){
        return this.setState({ in: !this.state.in });
    },

    componentDidMount() {
        if (initialState) { // Globally set into hbs templates
            this.setState(initialState);

        }
    },
    handleContinueClick() {
        const { isNewUser } = this.state;
        isNewUser ?  window.location = "/tutorial" : window.location =('/home');
    },

    handleCancel() {

    },
        render() {
            const {user} = this.state;
            const fade=200;


            return (
                <div>
                    <div className="main-section-home">
                        <NavBar user={ user }  />
                        {/*<div className="tutorial-heading">*/}
                            {/*<h1>Welcome to Wirlix</h1>*/}
                            {/*<p>Watch this video to understand our platform. Don’t skip this trust us it’s important.</p>*/}
                        {/*</div>*/}
                        <div className="overlay">
                        </div>
                        <div className="button-home col-md-4" style={{ position: "absolute" }}>
                            <a href="/home#cont-section">Welcome to Wirlix</a>
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