var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userFunc = require('./routes/users');

const uri = 'mongodb+srv://Zakaria:L1gpHCFZEzmDw8BE@cluster0.sgiwmpq.mongodb.net/emsiapp?retryWrites=true&w=majority';
const options={
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options)
.then(() => {
  console.log('Connected to MongoDB');
},
err =>{
  console.log('Error connecting',err);
}
);


var app = express();

const prefix = '/api';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.route(prefix+'/users')
.get(userFunc.getUsers);

app.route(prefix+'/users/:id')
.get(userFunc.getUser)
.delete(userFunc.deleteUser);

app.route(prefix+'/users')
.post(userFunc.createUser)
.put(userFunc.updateUser);

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
