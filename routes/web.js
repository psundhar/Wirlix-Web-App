const router = require('express').Router();
const passport = require('passport');

const Topic = require('../models/topics');
const Debate = require('../models/debates');
const Statement = require('../models/statements');
const User = require('../models/users');

router.use(function(req, res, next) { // TODO - for some reason couldn't get passport's default middleware to work
    if(!req.user) {
        res.redirect('/');
    }
    else {
        return next();
    }
});

router.get('/debate', function(req, res) {
    Promise.all([Topic.queryLatest().exec(), Debate.queryAll().exec()])
        .then(function(promiseResultsArray) {
            const topic = promiseResultsArray[0];
            const debates = promiseResultsArray[1];

            var bgImage = "../images/piccool.jpeg", prompt = "Should abortion be legal?";

            if(topic) {
                bgImage = topic.image;
                prompt = topic.prompt;
            }

            const data = {
                topic: topic,
                debates: debates,
                user: req.user,
            };

            res.render('react_main', { page: 'debate', data: JSON.stringify(data) });
        }).
    catch(function(err) {
        console.log(err);
        res.status(500);
    })
});

router.get('/home', function(req, res) {
    Topic.queryLatest().exec()
        .then(function(topic) {
            return Promise.all([Promise.resolve(topic), Statement.queryTopic(topic._id)]);
        })
        .then(function(resultsArr) {
            const topic = resultsArr[0];
            const statements = resultsArr[1];

            const data = {
                topic: topic,
                statements: statements,
                user: req.user,
            };

            res.render('react_main', { page: 'home', data: JSON.stringify(data)});
        })
        .catch(function(err) {
            console.log(err);
            res.status(500);
        });
});

router.get('/profile/:id', function(req, res, next) {
    User.findById(req.params.id)
        .exec()
        .then(function(user) {
            return Promise.all([user, Topic.queryLatest().exec()]);
        })
        .then(function(resultsArray) {
            const user = resultsArray[0];
            const topic = resultsArray[1];

            resultsArray.push(Statement.queryByTopicAndUser(topic._id, user._id).exec());
            resultsArray.push(Debate.queryByTopicAndUser(topic._id, user._id).exec());

            return Promise.all(resultsArray);
        })
        .then(function(resultsArray) {
            const user = resultsArray[0];
            const statement = resultsArray[2];
            const debates = resultsArray[3];

            const data = {
                user: user,
                statement: statement || {},
                debates: debates,
                loggedInUser: req.user,
            };

            res.render('react_main', { page: 'profile', data: JSON.stringify(data)});
        })
        .catch(function(err) {
            console.log(err);
            res.status(404);
            next();
        });
});

router.get('/image', function(req, res, next) {
    const data = {
        user: req.user,
    };

    res.render('react_main', { page: 'image', data: JSON.stringify(data)});
});

module.exports = router;
