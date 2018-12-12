"use strict";

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { User, TimeEntries, Category } = require('./models')

const app = express();
app.use(morgan('common'));
app.use(express.json());

app.get('/entries', (req, res) => {
  TimeEntries
    .find()
    .then(entries => {
      res.json(entries);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly wrong' });
    });
});

app.get('/entries/:id', (req, res) => {
  TimeEntries
    .findById(req.params.id)
    .then(entry => res.json(entry))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

app.post('/entries', (req, res) => {
  const requiredFields = ['title', 'startTime', 'endTime'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  TimeEntries
  .create({
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime
  })
  .then(entry => res.status(201).json(entry))
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'Something went terrifically wrong'});
  });
});

let server;

function runServer(database_url, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database_url, err => {
      if (err) {
        return reject(err);
      }
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