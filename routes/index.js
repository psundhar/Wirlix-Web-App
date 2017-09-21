var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var client= require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


var R = require('ramda')

module.exports = function(passport) {
    /* GET home page. */
    router.get('/', function(req, res) {
        res.render('index', { title: 'Wirlix', error: req.flash('error'), signupError: req.flash('signup')});
    });
    router.get('/resetpassword', function(req, res) {
        res.render('resetpassword', { title: 'Wirlix', error: req.flash('error'), success: req.flash('success')});
    });


    // router.get('/profile', function(req, res) {
    //     //res.send('Successfully authenticated');
    //     res.render('profile', { name: req.body.fullName });
    // });

    // router.get('/lit', function(req, res) {
    //     res.render('lit', {name: req.body.fullName});
    // });

    // router.get('/testtwilio', function(req, res) {
    //     res.render('testtwilio', {name: req.body.firstName})
    // })

    // router.get('/about', function(req, res) {
    //     res.render('about', { name: req.body.fullName });
    //
    // })

    // router.get('/email', function(req, res) {
    //     res.render('email', { name: req.body.fullName });
    // })
    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/',
        failureFlash: true,
        successRedirect: '/home',
    }));

    router.get('/logout', function(req, res) {
        req.logout();
        res.render('index', { title: 'Wirlix', error: req.flash('error'), signupError: req.flash('signup')});

        //res.render('logout', { name: req.body.fullName})
    });

    router.get('/enterdebate', function(req, res) {
        res.render('enterdebate', { name: req.body.fullName})
    });

    //router.get('/about', function(req, res) {
    //res.send('Successfully authenticated');
    //res.render('about', { name: req.body.firstName, title: Wirlix});
    //});
    //router.get('profilePic', function(req, res) {
    //res.render('profilePic', {name: req.body.firstName, title: Wirlix})
    //})


  /*  router.post('/testtwilio', function(req, res) {
        client.sendMessage({
            to: req.body.phoneNumber,
            from:'+16176525428',
            body: "Thanks for joining" + " " + req.body.fullName + "! Make sure to check out our site we have a ton of amazing shit coming up for you. At Wirlix, we are one world in unity and we believe in the power of people and the power in you. It's a movement and a revolution and we can't wait to change the world with you. We care about your experience and your happiness so please reach out anytime and stay tuned for an amazing journey. Welcome to Wirlix."
        });
        res.redirect('/testtwilio');
    });

    router.get('/testtwilio', function(req, res) {
        res.render('testtwilio.hbs')
    });*/


    router.post('/user', function(req, res, next) {
        // client.sendMessage({
        //     to: req.body.phoneNumber,
        //     from:'+16176525428',
        //     body: "Thanks for joining" + " " + req.body.fullName + "! Make sure to check out our site we have a ton of amazing shit coming up for you. At Wirlix, we are one world in unity and we believe in the power of people and the power in you. It's a movement and a revolution and we can't wait to change the world with you. We care about your experience and your happiness so please reach out anytime and stay tuned for an amazing journey. Welcome to Wirlix."
        // });
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            port: 25,
            auth: {
                user: 'wirlixtest@gmail.com',
                pass: 'test@W!rl!x'
            },
            tls : {
                rejectUnauthorized: false
            }
        });

        var name = req.body.firstName;
        //var password = req.body.password;
        let mailOptions = {
            from: 'wirlixtest@gmail.com',
            to: req.body.email,
            subject: 'Welcome to Wirlix',
            text: 'Welcome to Wirlix',
            html: `
        <div>

            <div>
              <img src='cid:unique@nodemailer.com' style="width:100%;" />
            </div>

        </div>
        <div>
          <div style = "
            color: black;
           font-size: 15px;
           -ms-word-wrap: normal;
           word-wrap: normal;
           font-family: Raleway,Arial,sans-serif;
           /*line-height: 1.2em;*/
           line-height: 1.5em;
           letter-spacing: 2px;
           font-weight: 400;
           font-style: normal;
           -webkit-font-smoothing: antialiased;
           padding-bottom: 2rem;
           padding-top: 30px;">
            What's up ${req.body.fullName}, <br /><br />

My name is Priyanka and I am the founder of Wirlix. I just wanted to say thanks so much for being a part of Wirlix and helping spread our vision. A little about why I started Wirlix  Sometimes life can seem like we are just checking boxes rather than living for ourselves. We have all felt trapped and by ourselves. In a world where all of us are guilty of trying to fit in and be the same type of person. I wanted to create a place for the part of everyone that does not. The rule-breakers or as Steve Jobs so famously said, “the ones who see things differently.” Essentially, Wirlix is the platform for the the part of you that makes you who you are: your story and your reality. Feel free to debate or chat with me any day, We have a lot of awesome features and new products coming out soon so stay tuned! I will always have an opinion on Wirlix otherwise you can reach me at this email with any questions, concerns or honestly just anything. I would love to hear from you.

             <br /><br />
            Here is your password in case you ever forget.
            <br /><br />

            Password: ${req.body.password}
            <div style = "
            color: black;
            font-size: 14px;
            -ms-word-wrap: normal;
            word-wrap: normal;
            font-family: Raleway,Arial,sans-serif;
            /*line-height: 1.2em;*/
            line-height: 1em;
            letter-spacing: 2px;
            font-weight: 200;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            padding-top: 10px;">
            <br />
            </div>



         <div style = "
           color: black;
           font-size: 15px;
           -ms-word-wrap: normal;
           word-wrap: normal;
           font-family: Raleway,Arial,sans-serif;
           /*line-height: 1.2em;*/
           line-height: 1.5em;
           letter-spacing: 2px;
           font-weight: 400;
           font-style: normal;
           -webkit-font-smoothing: antialiased;
           padding-bottom: 2rem;

           padding-top: 5px;">

        Thanks for joining! Feel free to email us about anything. Just reach out we would love to hear from you.
        Enjoy your journey.

        <br />
            <br />
            <br />
         Sincerely, <br /><br /><br />





          </div>
        </div>
        <div>
          <div style = "
            color: black;
            font-size: 25px;
            -ms-word-wrap: normal;
            word-wrap: normal;
            font-family: Times New Roman, serif;
            font-style: oblique;
            /*line-height: 1.2em;*/
            line-height: 1em;
            letter-spacing: 2px;
            font-weight: 200;
            -webkit-font-smoothing: antialiased;
            padding-bottom: 2rem;
            padding-top: 10px;">

            Priyanka <br />


          </div>
        </div>
        <div>
          <div style = "
            color: black;
            font-size: 15px;
            -ms-word-wrap: normal;
            word-wrap: normal;
            font-family: Times New Roman, serif;
            font-style: oblique;
            /*line-height: 1.2em;*/
            letter-spacing: 0px;
            line-height: 1em;
            font-weight: 200;
            -webkit-font-smoothing: antialiased;
            padding-bottom: 2rem;
            padding-top: 10px;">

            Founder of Wirlix

          </div>

        <div>
        <img src="cid:uniquebcg@nodemailer.com" style="height:60px; width:60px"/>
        </div>

        </div>
            `,
            attachments: [{
                filename: 'image.png',
                    path: 'https://lh3.googleusercontent.com/0IVQgymYA08xSLcam4r32m1VIgaUdfLAlYoUzq9Hb1qDeka8cHxfvVcWyMTZfEikr8u6c125jb41FTmLE7Pt1zxLdbAqx8H2HJh4j2_a52vDZfBBj38S3RVXaFRcvbKkSkfXMGvTJYW5EadnSLl43xsxtmHrjJYzqkRhuF4qw8CdKXyjlcYpL230oNFxl-vTOMxiHeWIjYaW8WmsC4jPJ5h1Doqdn92EwoF2hjYwZ951csQHhhDChGcke31sILjH_oC7iUpG1rl-eSyuVnHF0H-QK9QItQsO7dD-CHcXwHFQaR0k_wHf6ehKaWpDlREVl17jN_fl0n4_QEz4UDaOE7z1nsl2BE7Aid_CMdZWsOCs3Y-20e0e5qztF74YsC-DoNJHvhU8rGQM95ebPNht3iuXzaqmkO-78JARtpH8SqwHYLDPPlOpbEqOryviIVts-maobL6aThpInMIJJgjGvpO_JZ5aQWTYMtCASH3Ciey3hhGKhFFI9Bb1kYpl0NJsi57EucHA9lXBd9eRWl9ee63yuFvrzzgCV8KMhsUpHWekjywOI11IpVMj2lifLljln0rG_DL3xw=s2594-w2594-h998-no', //same cid value as in the html img src
                cid: 'unique@nodemailer.com'
            },
                {
                    filename: 'image.png',
                    path: 'public/images/wx_logo2.png',
                    cid: 'uniquebcg@nodemailer.com' //same cid value as in the html img src
                }
            ],
         /*  alternatives: [
                {
                    contentType: 'text/html',
                    content: '/views/email.hbs'
                }
            ]*/
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
            console.log('Message % s sent: %s', info.messageId, info.response);
        });

        var fullName = req.body.fullName;
        var password = req.body.password;
        var email = req.body.email;
        var phoneNumber = req.body.phoneNumber;

        const nameArr = fullName.split(' ');

        bcrypt.hash(password, 10).then(function(hashedPass) {
            var newUser = new User({
                fullName: fullName,
                firstName: nameArr[0],
                lastName: nameArr.length > 1 ? nameArr[1] : null,
                password: hashedPass,
                email: email,
                phoneNumber: phoneNumber,
                username: req.body.username,
            });

            newUser.save(function(err,savedUser) {
                if(err) {
                    console.log(err);
                    let message = '';
                    if(err.name == 'MongoError') {
                        message = 'Your username or e-mail already exists. Please try another.';
                        req.flash('signup', message);
                    }
                    res.redirect('/');
                }
                else {
                    // Log out existing user if any
                    req.logOut();
                    // Log in user
                    req.logIn(savedUser, function(err) {
                        if(err) {
                            console.log(err);
                            return next(err);
                        }
                        res.redirect('/image?isNewUser=true');
                    })
                }
            });
        })
            .catch(function(err) {
                console.log(err);
                res.status(500);
                res.end();
            });
    });



 // **************************************************


    router.post('/resetpassword', function(req, res, next) {


        var email = req.body.email;

        User.findOne({ email: req.body.email }).select('username email firstName resettoken').exec(function(err, user) {
            let message = '';
            if (err) throw err; // Throw error if cannot connect
            if (!user) {
                message = "Your E-mail does not match any E-mails in our Database.";
                req.flash('error', message);
                res.redirect('/resetpassword');

                // res.json({ success: false, message: 'E-mail was not found' }); // Return error if username is not found in database
            } else {

                user.resettoken = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });
              //  console.log(user.resettoken);

//                 var resetToken = user.resettoken;
              /*      var query={username:user.username};*/
              /*           console.lo*/
              /*user.update(query,{$set:{resettoken: user.resettoken}}).exec();*/

                // Create a token for activating account through e-mail
                // Save token to user in database
                user.save(function(err,savedUser) {
                    if (err) {
                        res.json({ success: false, message: err }); // Return error if cannot connect
                    } else {
                        //console.log(savedUser)  ;
                        // Create e-mail object to send to user
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            secure: false,
                            port: 25,
                            auth: {
                                user: 'wirlixtest@gmail.com',
                                pass: 'test@W!rl!x'
                            },
                            tls : {
                                rejectUnauthorized: false
                            }
                        });
                        let mailOptions = {
                            from: 'wirlixtest@gmail.com',
                            to: req.body.email,
                            subject: 'Welcome to Wirlix',
                            text: 'Welcome to Wirlix',
                            html: `

                                <div>
                                <div style = "
                                    color: black;
                                    font-size: 15px;
                                    -ms-word-wrap: normal;
                                    word-wrap: normal;
                                    font-family: Raleway,Arial,sans-serif;
                                    /*line-height: 1.2em;*/
                                    line-height: 1.5em;
                                    letter-spacing: 2px;
                                    font-weight: 400;
                                    font-style: normal;
                                    -webkit-font-smoothing: antialiased;
                                    padding-bottom: 2rem;
                                    padding-top: 30px;">
                                    <br /><br />

                                Hello,<br/>

                                <br /><br />
                                Someone (hopefully you) has requested a password reset for your Wirlix account. Follow the link below to set a new password:

                               <br><br><a href="http://localhost:3000/resetpassword/${user.resettoken}">Click here to reset your password</a>
                                <br/><br/>
                                If you don't wish to reset your password, disregard this email and no action will be taken.

                                <br /><br />



        <br/><br/>
        The Wirlix Team
        <br/>
        https://www.wirlix.com
        </div>
        <div>
        <img src='cid:uniquebcg@nodemailer.com' style="height:60px; width:60px"/>
        </div>

                                </div>


                                `,
                                attachments: [
                                    {
                                        filename: 'image.png',
                                        path: 'public/images/wx_logo2.png',
                                        cid: 'uniquebcg@nodemailer.com' //same cid value as in the html img src
                                    }
                                ],
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if(error) {
                                return console.log(error);
                            }
                            console.log('Message % s sent: %s', info.messageId, info.response);
                        });
                        console.log("message flash");
                        message = "A Password Reset Link Has Been Sent To Your Registered E-mail ID.";
                        req.flash('success', message);
                        res.redirect('/resetpassword');
                    }
                });
            }
        });




    });
    // Route to verify user's e-mail activation link
    router.get('/resetpassword/:token', function(req, res) {
        User.findOne({ resettoken: req.params.token }).select().exec(function(err, user) {
            if (err) throw err; // Throw err if cannot connect
            var token = req.params.token; // Save user's token from parameters to variable
          //  console.log(token);
            // Function to verify token
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Password link has expired' }); // Token has expired or is invalid
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Password link has expired' }); // Token is valid but not no user has that token anymore
                    } else {
                        //res.json({ success: true, user: user });
                        res.render('savepassword',{rtoken: token, title: 'Wirlix', render: ''});
                        console.log(user);// Return user object to controller

                    }
                }
            });
        });


    });


    router.post('/savepassword', function(req, res, rtoken) {

        //console.log(token);
        User.findOne({ resettoken:req.body.resettoken }).select('username email name password resettoken').exec(function(err, user) {

            if (err) throw err; // Throw error if cannot connect

            if (req.body.password == null || req.body.password == '') {
                res.json({ success: false, message: 'Password not provided' });
            } else{
                if(req.body.password2 == req.body.password) {


                    var password = req.body.password; // Save user's new password to the user object

                    bcrypt.hash(password, 10).then(function (hashedPass) {
                        user.password = hashedPass;
                        user.resettoken = false; // Clear user's resettoken
                        // Save user's new data
                        user.save(function (err, savedUser) {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                // Create e-mail object to send to user
                                res.render('loading', {title: 'Resetting Password...'});
                            }
                        });
                    });
                }
                else{
                      console.log("Passord did not match")     ;
                }
            }
        });
    });

 //
    // TOKBOX Video Chat Technology



const opentok = require('./opentok-api');
const broadcast = require('./broadcast-api');

/*
 * User Routes
 */


router.get('/viewer', (req, res) => {
  opentok.getCredentials('viewer')
    .then(credentials => res.render('viewer', { credentials: JSON.stringify(credentials) }))
    .catch(error => res.status(500).send(error));
});

router.get('/host', (req, res) => {
    opentok.getCredentials('host')
    .then(credentials => res.render('host', { credentials: JSON.stringify(credentials) }))
    .catch(error => res.status(500).send(error));
});

router.get('/guest', (req, res) => {
  opentok.getCredentials('guest')
    .then(credentials => res.render('guest', { credentials: JSON.stringify(credentials) }))
    .catch(error => res.status(500).send(error));
});

router.get('/broadcast', (req, res) => {
  const url = req.query.url;
  const availableAt = req.query.availableAt;
  res.render('broadcast', { broadcast: JSON.stringify({ url, availableAt }) });
});



/*
 * API Endpoints
 */
router.post('/broadcast/start', (req, res) => {
  const sessionId = R.path(['body', 'sessionId'], req);
  const streams = R.path(['body', 'streams'], req);
  broadcast.start(sessionId, streams)
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error));
});

router.post('/broadcast/layout', (req, res) => {
  const streams = R.path(['body', 'streams'], req);
  broadcast.updateLayout(streams)
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error));
});

router.post('/broadcast/end', (req, res) => {
  broadcast.end()
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error));
});

    return router;
}
