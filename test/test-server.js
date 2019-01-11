"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const faker = require('faker');

const expect = chai.expect;

const {Schedule} = require('../timeentries/models');

chai.use(chaiHttp);

function generateScheduleData(){
    
};

describe("index page", function () {
    it("should exist", function(){
        return chai
        .request(app)
        .get("/")
        .then(function(res){
            expect(res).to.have.status(200);
        });
    });
});