var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var client= require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

var R = require('ramda')

module.exports = function(passport) {
    /* GET home page. */
    router.get('/', function(req, res) {
        res.render('index', { title: 'Wirlix', error: req.flash('error'), signupError: req.flash('signup')});
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
            service: 'gmail',
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

            Wirlix Experiences promotes coexistence through real life adventures with people of different beliefs and backgrounds. Our idea is to get you out of your comfort zone and open your mind to unique people and experiences. Our first adventure is attending coachella with a group of other ravers. Everyone will have opposing beliefs on a certain controversy. The experience will be on video and you are allowed to use the footage for personal use as well! You guys will get to discuss your differences and tell your stories while experiencing one of the world’s greatest music festivals!

            Sign up today! It’s an experience of a lifetime on us.

            Email priyanka@wirlix.com for more details!
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

        Thanks for joining! Feel free to email us about anything. Just reach out we'd love to hear from you.
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
        <img src='cid:uniquebcg@nodemailer.com' style="height:60px; width:60px"/>
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
                    path: 'https://lh3.googleusercontent.com/DtzaKzqJr555NuNGjvo38Gj1INxs36j5lLcBJ7Zz5KCg_M_2N0LrM4cjMQBYz7bUyKYbpdVqoKgGn-cKtLZC9XFghhPT92HG5F8WFJSOL9HuKKWdXH8BzMydRLZ31WxHYVMuyV9ljDJLzzGkAAO2Gsu4MlfxE_IkhfhPJmJxNNCMhukSyc6yQp0nhXiGiAsrhWxYOnNaC-yvwuZft04AJaCsIqzZLXmUB8PDb3eubovE8Llb3BPE34gaBrZfc-EUb9vVdwTR0HgzW_95xrSM_wyqh2mmOOo-hgW9WxXB-loRfbw6qncSC6ep-4Xkp1k7OkBrA13iXoaMFCopap4Yw2_wFBm57H5pB_8-pOIzP3si2K7Y4rHBp0E30JMOZC2_T_Xx4bUzDHgTWs43nTVY7sY7WFArh1H1-buLfWmSk7D_YxKn1fglbZ3bjZSh_7kwrCCISsLMc4nVW1mz5_61_X9l58ByEkePZMyPUFwdIqarHyXH_QpFUjv7u9gzh2a4YMYRLuGSppKwYvS5klk9UIjt6LK4XTi3WrQUnuqcl8_xo0oSa88sxnS6Vu_qcEjUiamMkK5Axg=s1000-no',
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