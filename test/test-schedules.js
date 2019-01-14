"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const expect = chai.expect;

const { Schedule } = require('../timeentries/models');
const { User } = require('../user/models')
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config.js');

chai.use(chaiHttp);

function generateScheduleData() {
    return {
        "user": "5c3982df5c52e6001745c385",
        "data": {
            "Monday": [
                {
                    "_id": "5c38254e20aa730017fe9414",
                    "title": "sleep",
                    "startTime": "11:00 PM",
                    "endTime": "07:00 AM",
                    "category": "essential"
                }
            ],
            "Tuesday": [
                {
                    "_id": "5c38254e20aa730017fe9414",
                    "title": "sleep",
                    "startTime": "11:00 PM",
                    "endTime": "07:00 AM",
                    "category": "essential"
                },
                {
                    "_id": "5c38e5a557ab9000176ddbe8",
                    "title": "work",
                    "startTime": "09:00 AM",
                    "endTime": "05:00 PM",
                    "category": "necessary"
                }
            ],
            "Wednesday": [
                {
                    "_id": "5c38254e20aa730017fe9414",
                    "title": "sleep",
                    "startTime": "11:00 PM",
                    "endTime": "07:00 AM",
                    "category": "essential"
                }
            ],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
            "Sunday": []
        },
    }
};

function seedScheduleData() {
    return Schedule.insertMany(generateScheduleData());
};

function seedUserData() {
    return User.insertOne(generateUser);
};

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
};

describe("Schedules API Resource", function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedScheduleData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });

    describe('GET endpoint for /api/schedules', function () {
        let res;

        it('Should return schedule for the correct user', function () {
            return chai.request(app)
                .get('/api/schedules/5c3982df5c52e6001745c385')
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body.data).to.exist;
                });
        });
    });

    describe('POST endpoint for /api/schedules', function () {
        let res;
        const newTimeEntry = {
            "title": "coding",
            "startTime": "07:00 PM",
            "endTime": "09:00 PM",
            "category": "necessary",
            "day": ['Monday']
        };
        it('Should post entry to appropirate schedule', function () {
            return chai.request(app)
                .post('/api/schedules/5c3982df5c52e6001745c385')
                .send(newTimeEntry)
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.keys('title', 'startTime', 'endTime', 'category', '_id', '__v');
                });
        });
        it('Should not post entry to schedule without title', function () {
            return chai.request(app)
                .post('/api/schedules/5c3982df5c52e6001745c385')
                .send({
                    "startTime": "07:00 PM",
                    "endTime": "09:00 PM",
                    "category": "necessary",
                    "day": ['Monday']
                })
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal('Missing `title` in request body');
                });
        });
        it('Should not post entry to schedule without startTime', function () {
            return chai.request(app)
                .post('/api/schedules/5c3982df5c52e6001745c385')
                .send({
                    "title": "coding",
                    "endTime": "09:00 PM",
                    "category": "necessary",
                    "day": ['Monday']
                })
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal('Missing `startTime` in request body');
                });
        });
        it('Should not post entry to schedule without endTime', function () {
            return chai.request(app)
                .post('/api/schedules/5c3982df5c52e6001745c385')
                .send({
                    "title": "coding",
                    "startTime": "09:00 PM",
                    "category": "necessary",
                    "day": ['Monday']
                })
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal('Missing `endTime` in request body');
                });
        });
        it('Should not post entry to schedule without category', function () {
            return chai.request(app)
                .post('/api/schedules/5c3982df5c52e6001745c385')
                .send({
                    "title": "coding",
                    "startTime": "07:00 PM",
                    "endTime": "09:00 PM",
                    "day": ['Monday']
                })
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal('Missing `category` in request body');
                });
        });
        it('Should not post entry to schedule without day specified', function () {
            return chai.request(app)
                .post('/api/schedules/5c3982df5c52e6001745c385')
                .send({
                    "title": "coding",
                    "startTime": "07:00 PM",
                    "endTime": "09:00 PM",
                    "category": "necessary"
                })
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(400);
                    expect(res.text).to.equal('Missing `day` in request body');
                });
        });
    });

    describe('PUT endpoint for /api/schedules', function () {
        let res;
        it('Should update correct time entry in appropriate schedule', function () {
            return chai.request(app)
                .put('/api/schedules/5c3982df5c52e6001745c385')
                .send({
                    "_id": "5c38e5a557ab9000176ddbe8",
                    "title": "gaming",
                    "startTime": "09:00 PM",
                    "endTime": "011:00 PM",
                    "category": "necessary"
                })
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                })
        });
    });

    describe('DELETE endpoint for /api/schedules', function () {
        let res;
        it('Should delete specified time entries from appropriate schedule', function () {
            return chai.request(app)
                .delete('/api/schedules/5c3982df5c52e6001745c385')
                .send(['5c38e5a557ab9000176ddbe8'])
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(204);
                });
        });
    });
});