var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var client= require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const nodemailer = require('nodemailer');

module.exports = function(passport) {
    /* GET home page. */
    router.get('/', function(req, res) {
        console.log('Test');
        res.render('index', { title: 'Wirlix' });
    });

    router.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        console.log(info);
        if (!user) { return res.render('index', { title: 'Wirlix', error: info.message }); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/profile');
        });
      })(req, res, next);
    });

    //router.get('/', function(req, res, next) {

    //});

    router.get('/profile', function(req, res) {
        //res.send('Successfully authenticated');
        res.render('profile', { name: 'Priyanka' });
    });

    router.get('/lit', function(req, res) {
        res.render('lit', {name: req.body.firstName});
    });

    // router.get('/testtwilio', function(req, res) {
    //     res.render('testtwilio', {name: req.body.firstName})
    // })

    router.get('/about', function(req, res) {
        res.render('about', { name: req.body.firstName });

    })

    router.get('/email', function(req, res) {
        res.render('email', { name: req.body.firstName });
    })

    router.get('/logout', function(req, res) {
        res.render('logout', { name: req.body.firstName
        })
    })

    router.get('/live', function(req, res) {
        res.render('opentok', {title: Wirlix, name: req.body.firstName})
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
            body: "Thanks for joining" + " " + req.body.firstName + "! Make sure to check out our site we have a ton of amazing shit coming up for you. At Wirlix, we are one world in unity and we believe in the power of people and the power in you. It's a movement and a revolution and we can't wait to change the world with you. We care about your experience and your happiness so please reach out anytime and stay tuned for an amazing journey. Welcome to Wirlix."
        });
        res.redirect('/testtwilio');
    })

    router.get('/testtwilio', function(req, res) {
        res.render('testtwilio.hbs')
    });


    router.post('/user', function(req, res) {
        client.sendMessage({
            to: req.body.phoneNumber,
            from:'+16176525428',
            body: "Thanks for joining" + " " + req.body.firstName + "! Make sure to check out our site we have a ton of amazing shit coming up for you. At Wirlix, we are one world in unity and we believe in the power of people and the power in you. It's a movement and a revolution and we can't wait to change the world with you. We care about your experience and your happiness so please reach out anytime and stay tuned for an amazing journey. Welcome to Wirlix."
        });



            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'priyanka@wirlix.com',
                    pass: 'federer1998'
                }
            });
            // var name = req.body.firstName;
            // var password = req.body.password;
            let mailOptions = {
                from: 'priyanka@wirlix.com',
                to: req.body.email,
                subject: 'Welcome to Wirlix',
                text: 'Welcome to Wirlix',
                html: `<center><img src="https://s29.postimg.org/lu6vjo9yv/Screen_Shot_2017-04-22_at_6.48.29_PM.png"/></center>
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
            What's up ${req.body.firstName}, <br /><br />
            We hope you got our text. We promise not to spam you with pointless emails and we also promise a ton of amazing shit coming soon. <br /><br />
        Here is your password in case you forget.
            <br /><br />

            Password: ${req.body.password}
            <br /><br />
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
            padding-bottom: 2rem;
            padding-top: 10px;"><i> "One of the great liabilities of history is that all too many people fail to remain awake through great periods of social change. Every society has its protectors of status quo and its fraternities of the indifferent who are notorious for sleeping through revolutions. Today, our very survival depends on our ability to stay awake, to adjust to new ideas, to remain vigilant and to face the challenge of change." – Martin Luther King, Jr.</i>
            <br /><br />
              </div>
            </div>

          <a href="wirlix.com"><img src="https://image.ibb.co/eb9wo5/email_meme.jpg" alt="email_meme" border="0"></img></a>

         <br /><br />

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

        Feel free to email us about anything. Just reach out we'd love to hear from you!
        Enjoy your journey!

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

            transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    return console.log(error);
                }
                console.log('Message % s sent: %s', info.messageId, info.response);
            });

        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var birthday = req.body.birthday;
        var email = req.body.email;
        var phoneNumber = req.body.phoneNumber;
        console.log(firstName);
        console.log(lastName);
        console.log(password);
        console.log(birthday);
        console.log(email);
        console.log(phoneNumber);
        var newUser = new User({
            firstName: firstName,
            lastName: lastName,
            password: password,
            birthday: birthday,
            email: email,
            phoneNumber: phoneNumber,
        });
        newUser.save(function(err,savedUser) {
            if(err) {
                alert("Oops you forgot a field!")
            }
            console.log(savedUser);
            // res.send(savedUser);

            res.redirect('/testtwilio');
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
    .catch(error => res.status(500).send(errprofile

        or));
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

router.get('*', (req, res) => {
  res.redirect('/viewer');
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
