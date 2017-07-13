import React from 'react';

const NavBar = ({user}) => {
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
                        <a className="navbar-brand" href="#"><img src="/images/Wirlix_InvertedLogo.png" /></a>
                    </div>
                    <div className="collapse navbar-collapse center-m" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav center">
                            <li><a href="/home">News</a></li>
                            <li><a href="/debate">Debate</a></li>
                            <li><a href="#" data-toggle="modal" data-target="#rankings">Ranking</a></li>
                            <li><a href="about.html">About</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a className="profile-nav" href={ "/profile/" + user._id } style={{background: "url(/images/pexels-photo-103123.jpeg) center center no-repeat" }}></a></li>
                            <li><a className="help" href="tutorial.html">? <br/><span>See Tutorial</span></a></li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;