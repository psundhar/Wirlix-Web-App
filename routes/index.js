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
        let signup_error = req.query.sue ? decodeURIComponent(req.query.sue) : false;
        res.render('index', { title: 'Wirlix', signup_error: signup_error });
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

    router.get('/logout', function(req, res) {
        req.logout();

        res.render('logout', { name: req.body.fullName})
    })

    router.get('/enterdebate', function(req, res) {
        res.render('enterdebate', { name: req.body.fullName})
    })

    //router.get('/about', function(req, res) {
    //res.send('Successfully authenticated');
    //res.render('about', { name: req.body.firstName, title: Wirlix});
    //});
    //router.get('profilePic', function(req, res) {
    //res.render('profilePic', {name: req.body.firstName, title: Wirlix})
    //})


    router.post('/testtwilio', function(req, res) {
        client.sendMessage({
            to: req.body.phoneNumber,
            from:'+16176525428',
            body: "Thanks for joining" + " " + req.body.fullName + "! Make sure to check out our site we have a ton of amazing shit coming up for you. At Wirlix, we are one world in unity and we believe in the power of people and the power in you. It's a movement and a revolution and we can't wait to change the world with you. We care about your experience and your happiness so please reach out anytime and stay tuned for an amazing journey. Welcome to Wirlix."
        });
        res.redirect('/testtwilio');
    })

    router.get('/testtwilio', function(req, res) {
        res.render('testtwilio.hbs')
    });


    router.post('/user', function(req, res, next) {
        // client.sendMessage({
        //     to: req.body.phoneNumber,
        //     from:'+16176525428',
        //     body: "Thanks for joining" + " " + req.body.fullName + "! Make sure to check out our site we have a ton of amazing shit coming up for you. At Wirlix, we are one world in unity and we believe in the power of people and the power in you. It's a movement and a revolution and we can't wait to change the world with you. We care about your experience and your happiness so please reach out anytime and stay tuned for an amazing journey. Welcome to Wirlix."
        // });



            // let transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'priyanka@wirlix.com',
            //         pass: 'federer1998'
            //     }
            // });
            // var name = req.body.firstName;
            // var password = req.body.password;
            let mailOptions = {
                from: 'priyanka@wirlix.com',
                to: req.body.email,
                subject: 'Welcome to Wirlix',
                text: 'Welcome to Wirlix',
                html: `
        <div>
          <div style="
            text-align: center;
            color: black;
            font-size: 50px;
            -ms-word-wrap: normal;
            word-wrap: normal;
            font-family: Raleway,Arial,sans-serif;
            /*line-height: 1.35em;*/
            letter-spacing: 0px;
            line-height: 1em;
            text-transform: uppercase;
            letter-spacing: 7px;
            font-weight: 200;
            font-style: lighter;
            -webkit-font-smoothing: antialiased;
            padding-bottom: 2rem;
            padding-top: 75px;">
            Welcome to Wirlix</div>
        </div>
        <div>
          <div style = "
            color: black;
            font-size: 15px;
            -ms-word-wrap: normal;
            word-wrap: normal;
            font-family: Raleway,Arial,sans-serif;
            /*line-height: 1.2em;*/
            letter-spacing: 0px;
            line-height: 1em;
            letter-spacing: 2px;
            font-weight: 200;
            font-style: lighter;
            -webkit-font-smoothing: antialiased;
            padding-bottom: 2rem;
            padding-top: 10px;">
            What's up ${req.body.fullName}, <br /><br />
            We hope you got our text. We promise not to spam you with pointless emails and we also promise a ton of amazing shit coming soon. <br /><br />
        Here is your password in case you forget.
            <br /><br />

            Password: ${req.body.password}
            <div style = "
            color: black;
            font-size: 14px;
            -ms-word-wrap: normal;
            word-wrap: normal;
            font-family: Raleway,Arial,sans-serif;
            /*line-height: 1.2em;*/
            letter-spacing: 0px;
            line-height: 1em;
            letter-spacing: 2px;
            font-weight: 200;
            font-style: lighter;
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
           letter-spacing: 0px;
           line-height: 1em;
           letter-spacing: 2px;
           font-weight: 200;
           font-style: lighter;
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
            letter-spacing: 0px;
            line-height: 1em;
            letter-spacing: 2px;
            font-weight: 200;
            font-style: lighter;
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
            letter-spacing: 2px;
            font-weight: 200;
            font-style: lighter;
            -webkit-font-smoothing: antialiased;
            padding-bottom: 2rem;
            padding-top: 10px;">

            Founder of Wirlix

          </div>
        </div>
            `
                // attachments: [{
                //     filename: 'image.png',
                //     path: 'https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/30423_pets-products_january-site-flip_3-cathealth_short-tile_592x304._CB286975940_.jpg',
                //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
                // }
                // ]
                //alternatives: [
                //         {
                //         contentType: 'text/html',
                //         content: '/views/email.hbs'
                //     }
                // ]
            };

            // transporter.sendMail(mailOptions, (error, info) => {
            //     if(error) {
            //         return console.log(error);
            //     }
            //     console.log('Message % s sent: %s', info.messageId, info.response);
            // });

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
                    }
                    res.redirect('/?sue=' + message);
                }
                else {
                    // Log out existing user if any
                    req.logOut();
                    // Log in user
                    req.logIn(savedUser, function(err) {
                        if(err) {
                            return next(err);
                        }
                        res.redirect('/image/');
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
