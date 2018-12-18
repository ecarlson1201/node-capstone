'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise

const timeEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  category: { type: String, required: true }
});

const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  entries: [timeEntrySchema]
});

const scheduleSchema = new mongoose.Schema({
  user: { type: String, required: true },
  data: [daySchema]
});

const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);
const Day = mongoose.model('Day', daySchema);
const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = { TimeEntry, Day, Schedule };