'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const { TimeEntries, Day, Schedule } = require('./models');
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
    const requiredFields = ['title', 'startTime', 'endTime', 'category', 'days']
    const user = req.params.userId

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message)
        }
    }
    Schedule
        .find({ user: user })
        .then(user => {
            if (user) {
                const day = req.body.days
                Day
                    .updateMany(
                        { day: day },
                        {
                            $push: {
                                entries: {
                                    title: req.body.title,
                                    starTime: req.body.startTime,
                                    endtTime: req.body.endTime,
                                    category: req.body.category
                                }
                            }
                        }
                    )
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: 'Something went wrong' });
                    });
            }
            else {
                const message = "User not found"
                console.error(message);
                return res.status(400).send(message);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
});

router.delete('/delete/:id', (req, res) => {
    Schedule
    console.log(req.params.id)
        .findByIdAndDelete(req.params.id)
        .then(entry => res.status(204).end())
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
})

module.exports = { router };