"use strict";

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {User, TimeEntry, Category} = require('./models')

const app = express();
app.use(morgan('common'));

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

module.exports = app;