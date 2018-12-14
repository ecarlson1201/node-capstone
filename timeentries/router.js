'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const { Data, Days, TimeEntries, Category } = require('./models');

router.get('/', (req, res) => {
    Days
    .find()
    .then(data => res.json(data))
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'startTime', 'endTime', 'category', 'day']
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message)
        }
    }
    const timeEntries = TimeEntries.create({
        title: req.body.title,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        category: req.body.category
    });
    res.status(201).json(timeEntries)
});

module.exports = { router };