'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const { TimeEntry, Day, Schedule } = require('./models');
const { router: authRouter } = require('../auth/router');
const { localStrategy, jwtStrategy } = require('../auth/strategies')

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/:userId', (req, res) => {
    const user = req.params.userId;
    Schedule
        .find({ user: user })
        .then(session => res.json(session))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

router.post('/:userId', jsonParser, (req, res) => {
    const requiredFields = ['title', 'startTime', 'endTime', 'category', 'day']
    let user = req.params.userId;
    let day = req.body.day;
    let newTimeEntry = {
        title: req.body.title,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        category: req.body.category
    };

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message)
        };
    };

    TimeEntry
        .create(newTimeEntry)
        .then((timeentry) => {
            newTimeEntry = timeentry;
            return Schedule.findOne({ user: user });
        })
        .then((schedule) => {
            day.forEach(currentDay => {
                schedule.data[currentDay].push(newTimeEntry)
            });
            return schedule.save(function () { });
        })
        .then((savedSchedule) => {
            res.status(201).json(newTimeEntry)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went horribly awry' });
        });
});

router.put('/:userId', jsonParser, (req, res) => {
    let user = req.params.userId;
    const updatedPost = {};
    const updateableFields = ['title', 'startTime', 'endTime', 'category']
    let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    updateableFields.forEach(field => {
        if (field in req.body) {
            updatedPost[field] = req.body[field]
        }
    });
    
    TimeEntry
    .findOneAndUpdate(req.params.id, { $set: updatedPost }, { new: true })
    .then(() => {
        return Schedule.findOne({ user: user })
    })
    .then((schedule) => {
        for (let i = 0; i < week.length; i++) {
            return schedule.data[week[[i]]]
        }
    })
    .then((day) => {
        let match;
        day.forEach(function (entry) {
            if (entry.id === req.body._id) {
                match = entry;
            };
        })
        return match
    })
    .then((oldPost) => {
    })
    
    .catch(err => res.status(500).json({ message: err }))
})

router.delete('/:userId', jsonParser, (req, res) => {
    let user = req.params.userId;
    let toBeDeleted = req.body
    let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    toBeDeleted.forEach(function (index) {
        //        TimeEntry
        //            .findByIdAndRemove(id, () => { res.status(204).end() })
        //            .catch(err => res.status(500).json({ message: err }))
        
        Schedule
        .findOne({ user: user })
        .then((schedule) => {
            for (let i = 0; i < week.length; i++) {
                return schedule.data[week[[i]]]
            }
        })
        .then((day) => {
                let match;
                day.forEach(function (entry) {
                    if (entry.id === index) {
                        match = entry;
                    };
                })
                return match
            })
            .deleteOne((oldPost) => {
                console.log(oldPost)
            })
            .catch(err => res.status(500).json({ message: err }))
        })
});

module.exports = { router };