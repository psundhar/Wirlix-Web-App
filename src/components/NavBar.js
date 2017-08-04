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
                    console.log(that);
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
        // const { isOpen } = this.props;
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
                            <a className="navbar-brand" href="/home"><img src="/images/Wirlix_InvertedLogo.png" /></a>
                        </div>
                        <div className="collapse navbar-collapse center-m" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav center">
                                <li><a href="/home">News</a></li>
                                <li><a href="/debate">Debate</a></li>
                                <li><a href="/rankings">Ranking</a></li>
                                <li><a href="/about">About</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a className="profile-nav" onClick={this.toggleMenu} href="#" style={{background: "url(" + profileImage + ") center center no-repeat" }}>
                                    { notify && (<div style={{position:'absolute',top:0,left:0,height:"13px",width:"13px",borderRadius:"100px",backgroundColor:"crimson"}}></div>) }
                                </a>
                                    {isOpen ?  <ul className="dropdown-menu" id="dropdown" style={{display:"inline-block", background: "red"}}>
                                        <li><a href={"/profile/" + user._id}>Profile</a></li>
                                        <li><a href={"/image/"}>Upload Image</a></li>
                                        <li><a href="#">Settings</a></li>
                                    </ul>: null}</li>
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