var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var User = require('./models/users');
var app = express();
var passport = require('passport');
//var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const apiRoutes = require('./routes/api');
// const webRoutes = require('./routes/web');

mongoose.connect(connect);

// view engine setup
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'web_main'}));
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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({$or: [{ username: username }, { email: username }]})
        .exec()
        .then(function(user) {
            if(user) {
                console.log(user);
                return Promise.all([bcrypt.compare(password, user.password), user]);
            }
            return done(null, false, { message: 'Invalid username or password.' });
        })
        .then(function(resArray) {
            if(resArray[0]) {
                console.log("HERE", resArray[1]);
                return done(null, resArray[1]);
            }
            else {
                return done(null, false, { message: 'Password incorrect' });
            }
        })
        .catch(function(err) {
            console.log(err);
            return done(err);
        });
}));

app.use(flash());

app.use('/api', apiRoutes);

app.use('/', index(passport));

app.use('/', require('./routes/web'))

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

const server = app.listen(process.env.PORT, function () {
    console.log("Example port is listening on app!");
});

const io = require('socket.io')(server);

global.io = io; // TODO remove vars from global

io.on('connection', function(socket) {
    console.log("Socket.io: User Connected");

    socket.on('disconnect', function() {
        console.log("Socket.io: User Disconnected");
    });
});

module.exports = app;
