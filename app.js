var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var contract = require("@truffle/contract");
var Web3 = require('Web3');
const { Pool } = require('pg');

const myOrganContractJson = require('./truffle/build/contracts/OrganDonor.json');
const provider = new Web3.providers.HttpProvider("http://localhost:7545");
OrganDonorContract = contract(myOrganContractJson);
OrganDonorContract.setProvider(provider);
coinbase = "0xC9F02A313f0A10c1dAF476a86Dc21A30754a3a34";

const myOrganContract1Json = require('./truffle/build/contracts/OrganTry.json');
organtryContract = contract(myOrganContract1Json);
organtryContract.setProvider(provider);

pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'organ_donor',
  port: 5432
});

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: "ThisIsMyBigScretWhichIdoesnotLikeToShare",
  name: "SESSION",
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;