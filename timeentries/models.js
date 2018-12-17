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

const TimeEntries = mongoose.model('TimeEntry', timeEntrySchema);
const Days = mongoose.model('Days', daySchema);
const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = { TimeEntries, Days, Schedule };