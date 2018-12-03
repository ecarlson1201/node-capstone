'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise

const userSchema = new mongoose.schema({
  username: {type:String, required:true},
  password: {type:String, required:true}
});

const timeEntrySchema = new mongoose.schema({
  startTime: {type:Date, required:true},
  endTime: {type:Date, required:true},
  title: {type:String, required:true},
  category: {type:mongoose.Schema.Types.ObjectId, ref:'Category', required:true},
  description: {type:String},
  completed: {type:Boolean, default:false},
  days: {type:[String]},
  reoccuring: {type:Boolean, default:false}
});

const categorySchema = new mongoose.schema({
  name: {type:String, required:true},
  level: {type:Number, required:true}
});

const User = mongoose.model('User', userSchema);
const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = {User, TimeEntry, Category};