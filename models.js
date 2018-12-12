'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
  username: {type:String, required:true},
  password: {type:String, required:true}
});

const timeEntrySchema = new mongoose.Schema({
  title: {type:String, required:true},
  startTime: {type:String, required:true},
  endTime: {type:String, required:true},
  category: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
});

const categorySchema = new mongoose.Schema({
  name: {type:String, required:true},
  level: {type:Number, required:true}
});

const User = mongoose.model('User', userSchema);
const TimeEntries = mongoose.model('TimeEntry', timeEntrySchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = {User, TimeEntries, Category};