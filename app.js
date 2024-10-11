var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const hbs = require('hbs');

// Helpers
const { getRandomColors } = require('./helpers/getRandomColors');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

var indexRouter = require('./routes/index');

var app = express();


// Configura o diretório de views
app.set('views', path.join(__dirname, 'views')); 
app.use('/helpers', express.static(path.join(__dirname, 'helpers')));
app.set('view engine', 'hbs');

// Registrando Helpers
hbs.registerHelper('getRandomColors', getRandomColors);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet()); // Para dar proteção contra ataques

app.use('/', indexRouter);

module.exports = app;