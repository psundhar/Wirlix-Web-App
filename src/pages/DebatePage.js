var DebatePage = React.createClass({
    render: function() {
        return (
            <div>
    <section class="debate-section" style="background: {{{pageBackground}}};">
            <nav class="navbar navbar-default">
            <div class="">
            <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><img src="images/Wirlix_InvertedLogo.png"></a>
            <!-- <div class="nav navbar-nav center mobile">
            <div class="search-mobile"><i class="fa fa-search" aria-hidden="true"></i><input type="text" name="search" placeholder="Search"></div>
            </div> -->
            </div>
            <div class="collapse navbar-collapse center-m" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav center">
            <li><a href="home.html">News</a></li>
            <li><a href="debate.html">Debate</a></li>
            <!-- <li><i class="fa fa-search" aria-hidden="true"></i><input type="text" name="search" placeholder="Search"></li> -->
            <li><a href="#" data-toggle="modal" data-target="#rankings">Ranking</a></li>
            <li><a href="about.html">About</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
            <li><a class="profile-nav" href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></li>
            <li><a class="help" href="tutorial.html">? <br><span>See Tutorial</span></a></li>

        </ul>
        </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
        </nav>
        <div class="response">
            <div class="container">
            <h1 class="main-question col-md-12" id="debate-prompt">{{{ topicPrompt }}}</h1>
        <div class="col-md-4 col-md-offset-4 my-debates-button">
            <a class="col-md-12" href="#">My Debates</a>
        </div>
        </div>
        </div>


        <section class="my-debates">

            <div class="container">
            <div class="my-debate col-md-6 col-md-offset-3 no-response">
            <div class="username">
            <p><a class="pic" href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a> <a class="un" href="profile.html">Username</a></p>
            </div>
            <p class="comment-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p><button type="button" class="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#convo">Reply</button></p>
            <p class="time-posted">25m</p>
        </div>
        <div class="my-debate col-md-6 col-md-offset-3">
            <div class="username">
            <p><a class="pic" href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a> <a class="un" href="profile.html">Username</a></p>
            </div>
            <p class="comment-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p><button type="button" class="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#convo">Reply</button></p>
            <p class="time-posted">25m</p>
        </div>
        <div class="my-debate col-md-6 col-md-offset-3 no-response">
            <div class="username">
            <p><a class="pic" href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a> <a class="un" href="profile.html">Username</a></p>
            </div>
            <p class="comment-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p><button type="button" class="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#convo">Reply</button></p>
            <p class="time-posted">25m</p>
        </div>
        <div class="my-debate col-md-6 col-md-offset-3">
            <div class="username">
            <p><a class="pic" href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a> <a class="un" href="profile.html">Username</a></p>
            </div>
            <p class="comment-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p><button type="button" class="reply-button col-md-4 col-md-offset-8 col-xs-12" data-toggle="modal" data-target="#convo">Reply</button></p>
            <p class="time-posted">25m</p>
        </div>
        </div>
        </section>




        <div class="comments">
            <div class="container">
            <div class="border decide">
            <ul  class="nav nav-pills">
            <li class="active col-xs-12">
            <a  href="#factual" data-toggle="tab">Best Debates</a>
        </li>
        <li class="col-xs-12"><a href="#middle" data-toggle="tab">Live Right Now</a>
        <li class="col-xs-12"><a href="#emotional" data-toggle="tab">Subscribed</a>
            </ul>
            <div class="tab-content">
            <div class="col-md-4 vote-col factual active" id ="factual">
            <h2 class="col-md-12"><img src="images/eye-w.png"><br>Best Debates</h2>
        <div class="debates col-md-12" id="best-debates-list">
            {{#each bestDebates}}
        {{> debates/debate}}
        {{/each}}
    </div>
        </div>

        <div class="col-md-4 vote-col middle" id ="middle">
            <h2 class="col-md-12"><br>Live Right Now</h2>
        <div class="debates col-md-12 live-debates">
            {{#each liveDebates}}
        {{> debates/debate}}
        {{/each}}
    </div>
        </div>


        <div class="col-md-4 vote-col emotional" id = "emotional">
            <h2 class="col-md-12"><img src="images/check-mark.png"><br>Subscribed Debates</h2>
        <div class="debates col-md-12" id="subscribed-debates-list">
            {{#each subscribedDebates}}
        {{> debates/debate}}
        {{/each}}
    </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        <div class="overlay">

            </div>
            </section>

            <!-- Modal -->
            <div id="convo" class="modal fade" role="dialog">
            <div class="modal-dialog">
            <!-- Modal content-->
        <div class="modal-content">
            <div class="chat-header col-md-12">
            <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="user-img">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            <p>Username</p>
            </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="user-img">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            <p>Username</p>
            </div>
            </div>
            <div class="vote-bar">
            <div class="vote-amt">
            <p><img src="images/eye-b.png"> 200</p>
            </div>
            <div class="vote-amt">
            <p><img src="images/check-mark-b.png"> 278</p>
            </div>
            </div>
            </div>
            <div class="chat-box">
            <div class="message-box dis-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box agr-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box dis-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box agr-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box dis-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        </div>
        <div class="reply-box col-md-12">
            <textarea placeholder="Write your opinion...."></textarea>
            <div class="col-md-4 col-sm-4 col-xs-4 end-button">
            <button class="end-debate">End Debate</button>
        </div>
        <div class="col-md-8 col-sm-8 col-xs-8 reply-button">
            <button class="reply-submit">Reply</button>
            </div>
            </div>
            <div class="close-bottom">
            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            <div class="end-confirm">
            <p>Are you sure you want to end this debate?</p>
        <div class="cancel col-md-6 col-sm-6 col-xs-6">
            <button>No</button>
            </div>
            <div class="confirm col-md-6 col-sm-6 col-xs-6">
            <button>Yes</button>
            </div>
            </div>
            <div class="end-message">
            <p class="quote">Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.</p>
        <p class="coexist"><span class="C">C</span><span class="O">O</span><span class="E">E</span><span class="X">X</span><span class="I">I</span><span class="S">S</span><span class="T">T</span></p>
            </div>
            <div class="end-overlay">

            </div>
            </div>
            <div class="q-container">
            <div class="question-box one">
            <p class="number">1</p>
            </div>
            <div class="question-box two">
            <p class="number">2</p>
            </div>
            <div class="question-box three">
            <p class="number">3</p>
            </div>
            </div>
            <div class="question one" style="display: none;">
            <div class="message-box question-box one">
            <div class="username">
            <p class="wirlix-img" style="background: url(images/Wirlix_InvertedLogo.png) center center no-repeat;"></p>
            <p> Wirlix</p>
            </div>
            <p class="message">this is question #1</p>
        <p class="time-posted">25m</p>
        </div>
        </div>
        <div class="question two" style="display: none;">
            <div class="message-box question-box one">
            <div class="username">
            <p class="wirlix-img" style="background: url(images/Wirlix_InvertedLogo.png) center center no-repeat;"></p>
            <p> Wirlix</p>
            </div>
            <p class="message">this is question #2</p>
        <p class="time-posted">25m</p>
        </div>
        </div>
        <div class="question three" style="display: none;">
            <div class="message-box question-box one">
            <div class="username">
            <p class="wirlix-img" style="background: url(images/Wirlix_InvertedLogo.png) center center no-repeat;"></p>
            <p> Wirlix</p>
            </div>
            <p class="message">this is question #3</p>
        <p class="time-posted">25m</p>
        </div>
        </div>
        </div>
        </div>

        <div id="view-debate" class="modal fade" role="dialog">
            <div class="modal-dialog">
            <!-- Modal content-->
        <div class="modal-content">
            <div class="chat-header col-md-12">
            <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="user-img">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            <p>Username</p>
            </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="user-img">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            <p>Username</p>
            </div>
            </div>
            <div class="vote-bar">
            <div class="vote-amt">
            <p><img src="images/eye-b.png"> 200</p>
            </div>
            <div class="vote-amt">
            <p><img src="images/check-mark-b.png"> 278</p>
            </div>
            </div>
            </div>
            <div class="chat-box">
            <div class="message-box dis-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box agr-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box dis-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box agr-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        <div class="message-box dis-message">
            <div class="username">
            <p><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a></p>
            </div>
            <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius egestas lacinia. </p>
        <p class="time-posted">25m</p>
        </div>
        </div>
        <div class="vote-box col-md-12">
            <div class="col-md-6 col-md-offset-3">
            <p><i class="fa fa-check"></i> Subscribe</p>
            </div>
            </div>
            <div class="close-bottom">
            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            </div>

            </div>
            </div>
            <div id="rankings" class="modal fade" role="dialog">
            <div class="modal-dialog">
            <!-- Modal content-->
        <div class="modal-content">
            <div class="my-ranking">
            <p class="my-info"><a href="profile.html" style="background: url(images/pexels-photo-103123.jpeg) center center no-repeat;"></a> Priyanka Sundhar</p>
        </div>
        <div class="my-rank-num">
            <p class="my-rank">#434</p>
        </div>
        <div class="top-ranks">
            <div class="factual rank-content">
            <h2><img src="images/best-debater.png"> Most Factual Debater</h2>
        <ul class="rank-container col-md-12">
            <div class="first-place">
            <li><span class="rank-number">1</span> John Appleseed</li>
        </div>
        <div class="col-md-6 col-sm-6">
            <li><span class="rank-number">2</span> John Appleseed</li>
        <li><span class="rank-number">3</span> John Appleseed</li>
        <li><span class="rank-number">4</span> John Appleseed</li>
        <li><span class="rank-number">5</span> John Appleseed</li>
        <li><span class="rank-number">6</span> John Appleseed</li>
        <li><span class="rank-number">7</span> John Appleseed</li>
        <li><span class="rank-number">8</span> John Appleseed</li>
        <li><span class="rank-number">9</span> John Appleseed</li>
        <li><span class="rank-number">10</span> John Appleseed</li>
        <li><span class="rank-number">11</span> John Appleseed</li>
        <li><span class="rank-number">12</span> John Appleseed</li>
        <li><span class="rank-number">13</span> John Appleseed</li>
        </div>
        <div class="col-md-6 col-sm-6">
            <li><span class="rank-number">14</span> John Appleseed</li>
        <li><span class="rank-number">15</span> John Appleseed</li>
        <li><span class="rank-number">16</span> John Appleseed</li>
        <li><span class="rank-number">17</span> John Appleseed</li>
        <li><span class="rank-number">18</span> John Appleseed</li>
        <li><span class="rank-number">19</span> John Appleseed</li>
        <li><span class="rank-number">20</span> John Appleseed</li>
        <li><span class="rank-number">21</span> John Appleseed</li>
        <li><span class="rank-number">22</span> John Appleseed</li>
        <li><span class="rank-number">23</span> John Appleseed</li>
        <li><span class="rank-number">24</span> John Appleseed</li>
        <li><span class="rank-number">25</span> John Appleseed</li>
        </div>
        </ul>
        <div class="next-buttons col-md-12 col-sm-12">
            <div class="col-md-6 col-sm-6">
            <button class="back">Back</button>
            </div>
            <div class="col-md-6 col-sm-6">
            <button class="next">Next</button>
            </div>
            </div>
            </div>
            <div class="emotional rank-content">
            <h2><i class="fa fa-hand-peace-o" aria-hidden="true"></i> Most <span class="coexist"><span class="C">C</span><span class="O">O</span><span class="E">E</span><span class="X">X</span><span class="I">I</span><span class="S">S</span><span class="T">T</span><span class="I">I</span><span class="N">N</span><span class="G">G</span></span>
            Debater</h2>
            <ul class="rank-container col-md-12">
            <div class="first-place">
            <li><span class="rank-number">1</span> John Appleseed</li>
        </div>
        <div class="col-md-6 col-sm-6">
            <li><span class="rank-number">2</span> John Appleseed</li>
        <li><span class="rank-number">3</span> John Appleseed</li>
        <li><span class="rank-number">4</span> John Appleseed</li>
        <li><span class="rank-number">5</span> John Appleseed</li>
        <li><span class="rank-number">6</span> John Appleseed</li>
        <li><span class="rank-number">7</span> John Appleseed</li>
        <li><span class="rank-number">8</span> John Appleseed</li>
        <li><span class="rank-number">9</span> John Appleseed</li>
        <li><span class="rank-number">10</span> John Appleseed</li>
        <li><span class="rank-number">11</span> John Appleseed</li>
        <li><span class="rank-number">12</span> John Appleseed</li>
        <li><span class="rank-number">13</span> John Appleseed</li>
        </div>
        <div class="col-md-6 col-sm-6">
            <li><span class="rank-number">14</span> John Appleseed</li>
        <li><span class="rank-number">15</span> John Appleseed</li>
        <li><span class="rank-number">16</span> John Appleseed</li>
        <li><span class="rank-number">17</span> John Appleseed</li>
        <li><span class="rank-number">18</span> John Appleseed</li>
        <li><span class="rank-number">19</span> John Appleseed</li>
        <li><span class="rank-number">20</span> John Appleseed</li>
        <li><span class="rank-number">21</span> John Appleseed</li>
        <li><span class="rank-number">22</span> John Appleseed</li>
        <li><span class="rank-number">23</span> John Appleseed</li>
        <li><span class="rank-number">24</span> John Appleseed</li>
        <li><span class="rank-number">25</span> John Appleseed</li>
        </div>
        </ul>
        <div class="next-buttons col-md-12 col-sm-12">
            <div class="col-md-6 col-sm-6">
            <button class="back">Back</button>
            </div>
            <div class="col-md-6 col-sm-6">
            <button class="next">Next</button>
            </div>
            </div>
            </div>
            </div>
            <div class="close-bottom">
            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
            </div>
            </div>
            </div>
            </div>
            </div>)

    },
});

ReactDOM.render(<DebatePage />, document.getElementById('react-root'));