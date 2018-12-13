'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise

const dataSchema = new mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  data: {type:mongoose.Schema.Types.ObjectId, ref:'Days'},
});

const userSchema = new mongoose.Schema({
  username: {type:String, required:true, unique: true},
  password: {type:String, required:true}
});

const daySchema = new mongoose.Schema({
  day: {type:String},
});

const timeEntrySchema = new mongoose.Schema({
  title: {type:String, required:true},
  startTime: {type:String, required:true},
  endTime: {type:String, required:true},
  category: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
});

const categorySchema = new mongoose.Schema({
  name: {type:String, required:true},
  rank: {type:Number, required:true}
});

const Data = mongoose.model('Data', dataSchema);
const User = mongoose.model('User', userSchema);
const Days = mongoose.model('Days', daySchema);
const TimeEntries = mongoose.model('TimeEntry', timeEntrySchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = {Data, User, Days, TimeEntries, Category};