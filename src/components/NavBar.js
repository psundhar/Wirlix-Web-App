import React from 'react';
import apiFetch from '../utilities/apiFetch';
import IO from 'socket.io-client';
import { Link } from 'react-router-dom';

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
        const { user } = this.props;

        const { notify, isOpen } = this.state;

        const profileImage = user.image || "/images/pexels-photo-103123.jpeg";

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
                            <Link className="navbar-brand" to="/home"><img src="/images/Wirlix_InvertedLogo.png" /></Link>
                        </div>
                        <div className="collapse navbar-collapse center-m" id="bs-example-navbar-collapse-1">
                          
                            <ul className="nav navbar-nav center" style={{backgroundColor: "rgba(0, 0, 0, 0.30)", marginLeft: "110px",borderRadius:'15px'  }}>
                                <li><Link to="/home"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>Live</span></Link></li>
                                <li><Link to="/debate"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>Debate</span></Link></li>
                                <li><Link to="/rankings"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>Ranking</span></Link></li>
                                <li><Link to="/about"><span style={{color:"white",fontSize: "1.2em", fontFamily: 'Source Code Pro'}}>About</span></Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a className="profile-nav" onClick={this.toggleMenu} style={{background: "url(" + profileImage + ") center center no-repeat" }} >
                                    { notify && (<div style={{position:'absolute',top:0,left:0,height:"13px",width:"13px",borderRadius:"100px",backgroundColor:"crimson"}}></div>) }
                                </a>
                                    <ul className="dropdown-menu" id="dropdown" style={{display: isOpen ? "inline-block" : "none", background: "white", borderRadius:"15px"}}>
                                        <li><Link to={"/profile/" + user._id}><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Profile   ></b></span></Link></li>
                                        <li><Link to={"/profile/"+ user._id +"#profile-notifications"}><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Notifications></b></span></Link></li>
                                        <li><Link to={"/image/"}><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Upload Image        ></b></span></Link></li>
                                        <li><a href="/logout"><span style={{color:"#424242", borderBottom: '1px solid grey', fontSize: "1.2em"}}><b>Logout       ></b></span></a></li>
                                    </ul></li>
                                <li><a className="help" href="/tutorial">? <br/><span>See Tutorial</span></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    },
});
export default NavBar;