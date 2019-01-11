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
        .findOne({ user: user })
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
    updateableFields.forEach(field => {
        if (field in req.body) {
            updatedPost[field] = req.body[field]
        }
    });
    let updated;

    TimeEntry
        .findOneAndUpdate({ _id: req.body._id }, { $set: updatedPost }, { new: true })
        .then((timeEntry) => {
            Schedule
                .findOne({ user: user })
                .then(schedule => {
                    let newScheduleData = Object.keys(schedule.data.toJSON()).slice(1).reduce((acc, dayKey) => {
                        acc[dayKey].forEach((entry, index) => {
                            if (entry.id === req.body._id) {
                                acc[dayKey][index] = timeEntry;
                                updated = timeEntry;
                            };
                        });
                        return acc;
                    }, schedule.data)
                    Schedule.findByIdAndUpdate(schedule.id, { data: newScheduleData })
                        .then(response => {
                            res.status(200).json(updated)
                        });
                })
                .catch(err => res.status(500).json({ message: "Something went terribly wrong updating schedules" }))
        })
        .catch(err => res.status(500).json({ message: "Something went terribly wrong updating timeentries" }))
})

router.delete('/:userId', jsonParser, (req, res) => {
    let user = req.params.userId;
    let toBeDeleted = req.body;
    let deleted = [];
    TimeEntry
        .remove({ _id: { $in: toBeDeleted }, }, () => { res.status(204).end() })
        .then(entry => {
            Schedule
                .findOne({ user: user })
                .then((schedule) => {
                    let newDeleteData = Object.keys(schedule.data.toJSON()).slice(1).reduce((acc, dayKey) => {
                        schedule.data[dayKey].reduce((newAcc, dataEntry, index) => {
                            toBeDeleted.forEach((event) => {
                                if (dataEntry.id === event) {
                                    newAcc.splice(index, 1)
                                    deleted.push(dataEntry)
                                };
                            });
                            return newAcc
                        }, schedule.data[dayKey])
                        return acc
                    }, schedule.data)
                    Schedule.findByIdAndUpdate(schedule.id, { data: newDeleteData })
                        .then(response => {
                            res.status(204).json(deleted);
                        })
                        .catch(err => res.status(500).json({ message: "Deletion from schedule successful" }))
                })
        })
        .catch(err => res.status(500).json({ message: "Delection from timeentries successful" }))
});

module.exports = { router };