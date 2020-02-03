var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var mongoose   = require('mongoose');
var passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');
var seller = require('./routes/seller');
var products = require('./routes/products');
var manager = require('./routes/manager');

var passportConfig = require('./lib/passport-config'); //passport 로그인

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.locals.moment = require('moment'); //시간 라이브러리
app.locals.querystring = require('querystring');

//mongodb 연결
mongoose.Promise = global.Promise; // ES6 Native Promise를 mongoose에서 사용한다.
const connStr = 'mongodb+srv://seonghunYang:hj@1027612@cluster0-sbtwm.mongodb.net/test?retryWrites=true&w=majority' ;
mongoose.connect(connStr, {useNewUrlParser: true });
mongoose.connection.on('error', console.error);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

const sessionStore = new session.MemoryStore();
const sessionId = 'mjoverflow.sid';
const sessionSecret =  'mymymymymoney'
// session을 사용할 수 있도록.
app.use(session({
  name: sessionId,
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  secret: sessionSecret
}));

app.use(flash()); // flash message를 사용할 수 있도록
app.use(express.static(path.join(__dirname, 'public')));

  //=======================================================
  // Passport 초기화
  //=======================================================
  app.use(passport.initialize());
  app.use(passport.session());
  passportConfig(passport);

  // pug의 local에 현재 사용자 정보와 flash 메시지를 전달하자.
  app.use(function(req, res, next) {
    res.locals.currentUser = req.user;  // passport는 req.user로 user정보 전달
    res.locals.flashMessages = req.flash();
    next();
  });
  
  
app.use('/', index);
app.use('/users', users);
app.use('/seller', seller);
require('./routes/auth')(app, passport);
app.use('/products', products);
app.use('/manager', manager);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
