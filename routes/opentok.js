// var token = "cGFydG5lcl9pZD00NTgzMDY1MiZzaWc9N2E4ZDE5NzY1OTc5ZDFmNWNkMjZhZmE1NDJlYmJkNzIwY2U2MmZhZTpzZXNzaW9uX2lkPTFfTVg0ME5UZ3pNRFkxTW41LU1UUTVNek15TnpZNE16TTJNMzVwUlc1Q1UxcHdTVzVJT0V0YVpscFFjemxhT1hOM2RuaC1RWDQmY3JlYXRlX3RpbWU9MTQ5MzMyNzY4MyZub25jZT0wLjM5Njk1ODEwMzAxNTAyMjImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQ5MzQxNDA4MyZjb25uZWN0aW9uX2RhdGE9dXNlcm5hbWUlM0Rib2I="
<script src="https://static.opentok.com/v2/js/opentok.min.js"></script>

 var apiKey = "45830652";
 var apiSecret = "4520980609132d28726f4332f39fcb4791415869";
//
// var OpenTok = require('opentok'),
//     opentok = new OpenTok(apiKey, apiSecret);


    const { apiKey, apiSecret } = require('../config');

    /** Imports */
    const R = require('ramda');
    const Promise = require('bluebird');
    const OpenTok = require('opentok');

    // http://bluebirdjs.com/docs/api/promisification.html
    const OT = Promise.promisifyAll(new OpenTok(apiKey, apiSecret));

    /** Private */

    const defaultSessionOptions = { mediaMode: 'routed' };

    /**
     * Returns options for token creation based on user type
     * @param {String} userType Host, guest, or viewer
     */
    const tokenOptions = (userType) => {
      const role = {
        host: 'moderator',
        guest: 'publisher',
        viewer: 'subscriber',
      }[userType];

      return { role };
    };

    /**
     * Create an OpenTok session
     * @param {Object} [options]
     * @returns {Promise} <Resolve => {Object}, Reject => {Error}>
     */
    let activeSession;
    const createSession = options =>
      new Promise((resolve, reject) => {
        const setActiveSession = (session) => {
          activeSession = session;
          return Promise.resolve(session);
        };

        OT.createSessionAsync(R.defaultTo(defaultSessionOptions)(options))
          .then(setActiveSession)
          .then(resolve)
          .catch(reject);
      });

    /**
     * Create an OpenTok token
     * @param {String} userType Host, guest, or viewer
     * @returns {String}
     */
    const createToken = userType => OT.generateToken(activeSession.sessionId, tokenOptions(userType));

    /** Exports */

    /**
     * Creates an OpenTok session and generates an associated token
     * @returns {Promise} <Resolve => {Object}, Reject => {Error}>
     */
    const getCredentials = userType =>
      new Promise((resolve, reject) => {
        if (activeSession) {
          const token = createToken(userType);
          resolve({ apiKey, sessionId: activeSession.sessionId, token });
        } else {

          const addToken = (session) => {
            const token = createToken(userType);
            return Promise.resolve({ apiKey, sessionId: session.sessionId, token });
          };

          createSession()
            .then(addToken)
            .then(resolve)
            .catch(reject);
        }
      });

    module.exports = {
      getCredentials
    };
    Contact GitHub API Training Shop Blog About














    // Create a session that will attempt to transmit streams directly between
// clients. If clients cannot connect, the session uses the OpenTok TURN server:
// opentok.createSession(function(err, session) {
//   if (err) return console.log(err);
//
//   // save the sessionId
//   db.save('session', session.sessionId, done);
// });
//
// // The session will the OpenTok Media Router, which is required for archiving:
// opentok.createSession({mediaMode:"routed"}, function(err, session) {
//   if (err) return console.log(err);
//
//   // save the sessionId
//   db.save('session', session.sessionId, done);
// });
//
// // A Session with a location hint
// opentok.createSession({location:'12.34.56.78'}, function(err, session) {
//   if (err) return console.log(err);
//
//   // save the sessionId
//   db.save('session', session.sessionId, done);
// });
//
// // A Session with an automatic archiving
// opentok.createSession({mediaMode:'routed', archiveMode:'always'}, function(err, session) {
//   if (err) return console.log(err);
//
//   // save the sessionId
//   db.save('session', session.sessionId, done);
// });
//

// var OT = require('opentok'),
// opentok = new OT("45830652", "4520980609132d28726f4332f39fcb4791415869");
// var sessionId = "1_MX40NTgzMDY1Mn5-MTQ5MzMyNzY4MzM2M35pRW5CU1pwSW5IOEtaZlpQczlaOXN3dnh-QX4"
// // var session = OT.initsession(apiKey, sessionId)
// // var sessionId = session.sessionId
//
//
// //Generate a basic session. Or you could use an existing session ID.
// opentok.createSession({mediaMode:'routed', archiveMode:'always'}, function(err, session) {
//   if (err) {
//     console.log("Error creating session:", error)
//   } else {
//     sessionId = session.sessionId;
//     console.log("Session ID: " + sessionId);
//
//
//     //  Use the role value appropriate for the user:
//     var tokenOptions = {};
//     tokenOptions.role = "publisher";
//     tokenOptions.data = "username=priyanka";
//
//     // Generate a token.
//     token = opentok.generateToken(sessionId, tokenOptions);
//     console.log(token);
//   }
// });
//
// //Joining a Session - Web
//
// var session;
// var connectionCount = 0;
//
// function connect() {
//   // Replace apiKey and sessionId with your own values:
//   session = OT.initSession(apiKey, sessionId);
//   session.on({
//     connectionCreated: function (event) {
//       connectionCount++;
//       console.log(connectionCount + ' connections.');
//     },
//     connectionDestroyed: function (event) {
//       connectionCount--;
//       console.log(connectionCount + ' connections.');
//     },
//     sessionDisconnected: function sessionDisconnectHandler(event) {
//       // The event is defined by the SessionDisconnectEvent class
//       console.log('Disconnected from the session.');
//       document.getElementById('disconnectBtn').style.display = 'none';
//       if (event.reason == 'networkDisconnected') {
//         alert('Your network connection terminated.')
//       }
//     }
//   });
//   // Replace token with your own value:
//   session.connect(token, function(error) {
//     if (error) {
//       console.log('Unable to connect: ', error.message);
//     } else {
//       document.getElementById('disconnectBtn').style.display = 'block';
//       console.log('Connected to the session.');
//       connectionCount = 1;
//     }
//   });
// }
//
// function disconnect() {
//   session.disconnect();
// }
//
// connect();
//
// //Initializing a Session Object
//
// // if (opentok.checkSystemRequirements() == 1) {
// //   var session = opentok.initSession(apiKey, sessionId);
// // } else {
// //
// //   sendMessage("Session not initialized")
// // }
//
//
//
// // var session;
// // var connectionCount = 0;
// //
// // function connect() {
// //   // Replace apiKey and sessionId with your own values:
// //   session = OT.initSession(apiKey, sessionId);
// //   session.on({
// //     connectionCreated: function (event) {
// //       connectionCount++;
// //       console.log(connectionCount + ' connections.');
// //     },
// //     connectionDestroyed: function (event) {
// //       connectionCount--;
// //       console.log(connectionCount + ' connections.');
// //     },
// //     sessionDisconnected: function sessionDisconnectHandler(event) {
// //       // The event is defined by the SessionDisconnectEvent class
// //       console.log('Disconnected from the session.');
// //       document.getElementById('disconnectBtn').style.display = 'none';
// //       if (event.reason == 'networkDisconnected') {
// //         alert('Your network connection terminated.')
// //       }
// //     }
// //   });
// //   // Replace token with your own value:
// //   session.connect(token, function(error) {
// //     if (error) {
// //       console.log('Unable to connect: ', error.message);
// //     } else {
// //       document.getElementById('disconnectBtn').style.display = 'block';
// //       console.log('Connected to the session.');
// //       connectionCount = 1;
// //     }
// //   });
// // }
// //
// // function disconnect() {
// //   session.disconnect();
// // }
// //
// // connect();
//
//
// //     opentok.startArchive(sessionId, { name: 'Important Presentation' }, function(err, archive) {
// //         if (err) {
// //             return console.log(err);
// //         } else {
// //             The id property is useful to save off into a database
// //             console.log("new archive:" + archive.id);
// //         }
// //     });
// //
// // var archiveOptions = {
// //   name: 'Important Presentation',
// //   outputMode: 'individual'
// // };
// // opentok.startArchive(sessionId, archiveOptions, function(err, archive) {
// //   if (err) {
// //     return console.log(err);
// //   } else {
// //     // The id property is useful to save off into a database
// //     console.log("new archive:" + archive.id);
// //   }
// // });
// // opentok.stopArchive(archiveId, function(err, archive) {
// //   if (err) return console.log(err);
// //
// //   console.log("Stopped archive:" + archive.id);
// // });
// //
// // archive.stop(function(err, archive) {
// //   if (err) return console.log(err);
// //   });
// //
// //   opentok.getArchive(archiveId, function(err, archive) {
// //   if (err) return console.log(err);
// //
// //   console.log(archive);
// // });
// //
// // opentok.listArchives({offset:100, count:50}, function(error, archives, totalCount) {
// //   if (error) return console.log("error:", error);
// //
// //   console.log(totalCount + " archives");
// //   for (var i = 0; i < archives.length; i++) {
// //     console.log(archives[i].id);
// //   }
// // });
