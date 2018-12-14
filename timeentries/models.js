'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise


const dataSchema = new mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  data: {type:mongoose.Schema.Types.ObjectId, ref:'Days'},
});

const daySchema = new mongoose.Schema({
  day: {type:String},
  entries: {type:mongoose.Schema.Types.ObjectId, ref:'TimeEntries'},
});

const timeEntrySchema = new mongoose.Schema({
  title: {type:String, required:true},
  startTime: {type:String, required:true},
  endTime: {type:String, required:true},
  category: {type:String, required:true},
});

const categorySchema = new mongoose.Schema({
  name: {type:String, required:true},
  rank: {type:Number, required:true}
});

const Data = mongoose.model('Data', dataSchema);
const Days = mongoose.model('Days', daySchema);
const TimeEntries = mongoose.model('TimeEntry', timeEntrySchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = {Data, Days, TimeEntries, Category};