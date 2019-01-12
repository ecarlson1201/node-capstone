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

function generateUser() {
    return {
        "_id": "5c3982df5c52e6001745c385",
        "username": "test-user",
        "password": "$2a$10$IXXRVoPAf2rsmrZtteEIcuin90t0hBV1b6eHa/amdD324LjUxKE/S",
    };
};

function generateScheduleData() {
    return {
        "user": "5c3982df5c52e6001745c385",
        "data": {
            "Monday": [],
            "Tuesday": [],
            "Wednesday": [],
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

    describe('GET endpoint', function () {

        it('Should return schedule for the correct user', function () {
            let res;
            return chai.request(app)
                .get('/api/schedules/5c3982df5c52e6001745c385')
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body.data).to.exist;
                });
        });
    });
});