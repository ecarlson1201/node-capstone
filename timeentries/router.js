'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const { TimeEntries, Days, Schedule } = require('./models');
const { router: authRouter } = require('../auth/router');
const { localStrategy, jwtStrategy } = require('../auth/strategies')

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', (req, res) => {
    console.log(req.query)
    TimeEntries
        .find()
        .then(data => res.json(data))
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'startTime', 'endTime', 'category', 'days']
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message)
        }
    }
    console.log(TimeEntries.find())
    TimeEntries.create({
        title: req.body.title,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        category: req.body.category,
        days: req.body.day
    })
    .then(day => res.status(201).json({
        id: day.id,
        title: day.title,
        startTime: day.startTime,
        endTime: day.endTime,
        category: day.category,
        days: day.day
    }))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

router.delete('/delete/:id', (req, res) => {
    TimeEntries
    .findByIdAndDelete(req.params.id)
    .then(entry => res.status(204).end())
    .catch(err => {
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    });
})

module.exports = { router };