'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise

const timeEntrySchema = mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  category: { type: String, required: true }
});

const daySchema = mongoose.Schema({
  Monday: [timeEntrySchema],
  Tuesday:[timeEntrySchema],
  Wednesday:[timeEntrySchema],
  Thursday:[timeEntrySchema],
  Friday:[timeEntrySchema],
  Saturday:[timeEntrySchema],
  Sunday:[timeEntrySchema]
});

const scheduleSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  data: daySchema
});

const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);
const Day = mongoose.model('Day', daySchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = { TimeEntry, Day, Schedule };