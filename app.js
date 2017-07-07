var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var users = require('./models/users');
var app = express();
var passport = require('passport');
//var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

const apiRoutes = require('./routes/api');

mongoose.connect(connect);

// view engine setup
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
//Passport
// Passport




app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// passport.use(new LocalStrategy(function(username, password, done) {
//   process.nextTick(function() {
//     // Auth Check Logic
//   });
// }));

passport.use(new LocalStrategy({passReqToCallback : true}, function(req, username, password, done) {
  // process.nextTick(function() {
    users.findOne({
      email: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Invalid Username or Password!' });
      }
      ;

      if (user.password != password) {
        return done(null, false, { message: 'Invalid Username or Password!' });
      }

      return done(null, user);
    });
  // });
}));



// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
//
// passport.use('login', new LocalStrategy({
//     passReqToCallback : true
//   },
//   function(req, username, password, done) {
//     // check in mongo if a user with username exists or not
//     User.findOne({ 'username' :  email },
//       function(err, user) {
//         // In case of any error, return using the done method
//         if (err)
//           return done(err);
//         // Username does not exist, log error & redirect back
//         if (!user){
//           console.log('User Not Found with username '+username);
//           return done(null, false,
//                 req.flash('message', 'User Not found.'));
//         }
//         // User exists but wrong password, log the error
//         if (!isValidPassword(user, password)){
//           console.log('Invalid Password');
//           return done(null, false,
//               req.flash('message', 'Invalid Password'));
//         }
//         // User and password both match, return user from
//         // done method which will be treated like success
//         return done(null, user);
//       }
//     );
// }));
//
// var isValidPassword = function(user, password){
//   return bCrypt.compareSync(password, user.password);
// }
// passport.use('signup', new LocalStrategy({
//     passReqToCallback : true
//   },
//   function(req, username, password, done) {
//     findOrCreateUser = function(){
//       // find a user in Mongo with provided username
//       User.findOne({'username':username},function(err, user) {
//         // In case of any error return
//         if (err){
//           console.log('Error in SignUp: '+err);
//           return done(err);
//         }
//         // already exists
//         if (user) {
//           console.log('User already exists');
//           return done(null, false,
//              req.flash('message','User Already Exists'));
//         } else {
//           // if there is no user with that email
//           // create the user
//           var newUser = new User();
//           // set the user's local credentials
//           newUser.username = username;
//           newUser.password = createHash(password);
//           newUser.email = req.param('email');
//           newUser.firstName = req.param('firstName');
//           newUser.lastName = req.param('lastName');
//
//           // save the user
//           newUser.save(function(err) {
//             if (err){
//               console.log('Error in Saving user: '+err);
//               throw err;
//             }
//             console.log('User Registration succesful');
//             return done(null, newUser);
//           });
//         }
//       });
//     };
//
//     // Delay the execution of findOrCreateUser and execute
//     // the method in the next tick of the event loop
//     process.nextTick(findOrCreateUser);
//   });
// );

app.use('/api', apiRoutes);

app.use('/', index(passport));
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var quotes = [
	"“Wisdom is not a product of schooling but of the lifelong attempt to acquire it.”  <br><br>— Albert Einstein",
	"“Live as if you were to die tomorrow. Learn as if you were to live forever.” <br><br>—  Mahatma Gandhi",
	"“Tell me and I forget, teach me and I may remember, involve me and I learn.” <br><br>— Benjamin Franklin",
	"“Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.”<br><br>— Richard Feynman",

	"“It is important that students bring a certain ragamuffin, barefoot irreverence to their studies; they are not here to worship what is known, but to question it.”  <br><br>—  Jacob Bronowski"
];



app.listen(3000, function () {
    console.log("Example port is listening on app!");
})

module.exports = app;
