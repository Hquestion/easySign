var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const expressJWT = require('express-jwt');
const { APP_ID } = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var graphRouter = require('./routes/graphql');
var messageRouter = require('./routes/message');
var signRouter = require('./routes/sign');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

var secretOrPrivateKey = APP_ID;  //加密token 校验token时要使用

app.use(expressJWT({
  secret: secretOrPrivateKey
}).unless({
  path: ['/users/login', '/users/createJWTToken', '/graphql']  //除了这个地址，其他的URL都需要验证
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql', graphRouter);
app.use('/message', messageRouter);
app.use('/sign', signRouter);

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
