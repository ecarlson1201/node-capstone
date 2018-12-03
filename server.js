"use strict";

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {User, TimeEntry, Category} = require('./models')

app.use(morgan('common'));
const app = express();

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

module.exports = app;