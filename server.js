"use strict";

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { Data, User, Days, TimeEntries, Category  } = require('./models')

const app = express();
app.use(morgan('common'));
app.use(express.json());

app.get('/days', (req, res) => {
  Days
    .find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly wrong' });
    });
});

let server;

function runServer(database_url, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database_url, err => {
      if (err) {
        return reject(err);
      }
      app.use(express.static('public'));
      server = app.listen(port, () => {
        console.log(`Capstone app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
};

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };