const router = require('express').Router();
const passport = require('passport');

const Topic = require('../models/topics');
const Debate = require('../models/debates');
const Statement = require('../models/statements');
const User = require('../models/users');
const Challenge = require('../models/challenges');

router.use(function(req, res, next) {
    if(!req.user) {
        return res.redirect('/');
    }
    return next();
});

// router.get('/debate', function(req, res) {
//     Topic.queryLatest().exec()
//     .then(function(topicResults) {
//         const topic = topicResults[0];
//
//         return Promise.all([topic, Debate.queryByTopic(topic._id).exec(), User.findById(req.user._id).exec()]);
//     })
//     .then(function(promiseResultsArray) {
//         const topic = promiseResultsArray[0];
//         const debates = promiseResultsArray[1];
//         const user = promiseResultsArray[2];
//
//         const data = {
//             topic: topic,
//             debates: debates,
//             user: user,
//         };
//
//         res.render('react_main', { page: 'debate', data: JSON.stringify(data) });
//     })
//     .catch(function(err) {
//         console.log(err);
//         res.status(500);
//     })
// });

router.get('/|home|debate|rankings|about|profile/:id|/?', function(req, res) {
    Topic.queryLatest().exec()
        .then(function(topic) {
            const topicId = topic[0]._id;

            const arrayOfPromises = [
                Promise.resolve(topic),
                Statement.queryTopic(topicId),
                User.findById(req.user._id).exec(),
                Debate.queryByTopic(topicId).exec(),
                Statement.queryByTopicAndUser(topic._id, req.user._id).exec(),
                Debate.queryByTopicAndUser(topic._id, req.user._id).exec(),
                Challenge.queryByUserAndTopic(req.user._id, topic._id).exec(),
                User.find({}).exec(),
            ];

            return Promise.all(arrayOfPromises);
        })
        .then(function(resultsArr) {
            const topic = resultsArr[0][0];
            const statements = resultsArr[1];
            const user = resultsArr[2];
            const debates = resultsArr[3];
            const userStatement = resultsArr[4];
            const userDebates = resultsArr[5];
            const userChallenges = resultsArr[6];
            const users = resultsArr[7];

            const data = {
                topic: topic,
                statements: statements,
                user: user,
                debates: debates,
                userStatement: userStatement,
                userDebates: userDebates,
                userChallenges: userChallenges,
                users: users,
            };

            res.render('react_main', { data: JSON.stringify(data)});
        })
        .catch(function(err) {
            console.log(err);
            res.status(500);
        });
});

// router.get('/profile/:id', function(req, res, next) {
//     User.findById(req.params.id)
//         .exec()
//         .then(function(user) {
//             return Promise.all([user, Topic.queryLatest().exec()]);
//         })
//         .then(function(resultsArray) {
//             const user = resultsArray[0];
//             const topic = resultsArray[1][0];
//
//             resultsArray.push(Statement.queryByTopicAndUser(topic._id, user._id).exec());
//             resultsArray.push(Debate.queryByTopicAndUser(topic._id, user._id).exec());
//
//             let challenges = [];
//
//             if(req.params.id == user._id) { // Requesting own profile
//                 challenges = Challenge.queryByUserAndTopic(user._id, topic._id).exec();
//             }
//
//             resultsArray.push(challenges);
//             resultsArray.push(Statement.queryTopic(topic._id).exec());
//
//             return Promise.all(resultsArray);
//         })
//         .then(function(resultsArray) {
//             const user = resultsArray[0];
//             const topic = resultsArray[1][0];
//             const statement = resultsArray[2];
//             const debates = resultsArray[3];
//             const challenges = resultsArray[4];
//             const allStatements = resultsArray[5];
//
//             const data = {
//                 user: user,
//                 topic: topic || {},
//                 statement: statement || {},
//                 debates: debates,
//                 loggedInUser: req.user,
//                 challenges: challenges,
//                 statements: allStatements,
//             };
//
//             res.render('react_main', { page: 'profile', data: JSON.stringify(data)});
//         })
//         .catch(function(err) {
//             console.log(err);
//             res.status(404);
//             next();
//         });
// });

router.get('/image', function(req, res, next) {
    const data = {
        user: req.user,
        isNewUser: req.query.isNewUser || false,
    };

    res.render('react_main', { page: 'image', data: JSON.stringify(data)});
});

// router.get('/rankings', function(req, res, next) {
//     Topic.queryLatest().exec()
//     .then(function(topic) {
//         return Promise.all([Statement.queryTopic(topic[0]._id), User.findById(req.user._id).exec()]);
//     })
//     .then(function(promiseResultsArray) {
//         const data = {
//             statements: promiseResultsArray[0],
//             user: promiseResultsArray[1],
//         };
//
//         res.render('react_main', { page: 'rankings', data: JSON.stringify(data)});
//     });
// });

// router.get('/about', function(req, res, next) {
//     const data = {
//         user: req.user,
//     };
//
//     res.render('react_main', { page: 'about', data: JSON.stringify(data)});
// });

router.get('/tutorial', function(req, res, next) {
    const data = {
        user: req.user,
    };

    res.render('react_main', { page: 'tutorial', data: JSON.stringify(data)});
});

module.exports = router;
