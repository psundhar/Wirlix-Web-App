import React from 'react';
import apiFetch from '../utilities/apiFetch';
import IO from 'socket.io-client';

const NavBar = React.createClass({
    toggleMenu: function(e)
    {
        e.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    },
    onClose: function()
    {
        this.setState({isOpen: false});
    },
    _fetchNotifications() {
        const that = this;
        apiFetch('/api/notifications', 'GET')
            .then(res => res.json())
            .then(json => {
                if(json.length > 0) {
                    that.setState({
                        notify: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },

    componentWillMount() {
        // Fetch whether notification is necessary
        this._fetchNotifications();
    },

    componentDidMount() {
        const socket = IO(); // Will need to be altered in production

        if(this.props.user._id) {
            socket.on('notifications', (data) => {
                console.log("notification received", data);

                this._fetchNotifications();
            });
        }

        document.body.addEventListener('click', this.onClose);
    },

    getInitialState() {
        return {
            notify: false,
            isOpen: false
        }
    },

    componentWillUnmount: function ()
    {
        document.body.removeEventListener('click', this.onClose);
    },

    render() {
        const { user, handleTutorialClick = null } = this.props;
        // const { isOpen } = this.props;
        const { notify, isOpen } = this.state;

        const profileImage = user.image || "/images/pexels-photo-103123.jpeg";

        const tutorialLinkText = (<span>? <br/><span>See Tutorial</span></span>);

        return (
            <div className="content">
                <nav className="navbar navbar-default">
                    <div className="">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/home"><img src="/images/Wirlix_InvertedLogo.png" /></a>
                        </div>
                        <div className="collapse navbar-collapse center-m" id="bs-example-navbar-collapse-1">
                          
                            <ul className="nav navbar-nav center" style={{backgroundColor: "rgba(0, 0, 0, 0.30)", marginLeft: "110px",borderRadius:'15px'  }}>
                                <li><a href="/home"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>Live</span></a></li>
                                <li><a href="/debate"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>Debate</span></a></li>
                                <li><a href="/rankings"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>Ranking</span></a></li>
                                <li><a href="/about"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>About</span></a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a className="profile-nav" onClick={this.toggleMenu} href="#" style={{background: "url(" + profileImage + ") center center no-repeat" }} >
                                    { notify && (<div style={{position:'absolute',top:0,left:0,height:"13px",width:"13px",borderRadius:"100px",backgroundColor:"crimson"}}></div>) }
                                </a>
                                    {isOpen ?  <ul className="dropdown-menu" id="dropdown" style={{display:"inline-block", background: "white", borderRadius:"15px"}}>
                                        <li><a href={"/profile/" + user._id}><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Profile   ></b></span></a></li>
                                        <li><a href={"/profile/"+ user._id +"#profile-notification"}><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Notifications      ></b></span></a></li>
                                        <li><a href={"/image/"}><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Upload Image        ></b></span></a></li>
                                        <li><a href="/logout"><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Logout       ></b></span></a></li>
                                    </ul>: null}</li>
                                    <li>
                                        { !handleTutorialClick && (<a className="help" href="/tutorial">{ tutorialLinkText }</a>) }
                                        { handleTutorialClick && (<a className="help" onClick={ e => { e.preventDefault(); handleTutorialClick(); } }>{ tutorialLinkText }</a>) }
                                    </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    },
});
export default NavBar;