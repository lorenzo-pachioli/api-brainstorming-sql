const { Schema, model } = require('mongoose');
const Users = require('./UsersModel');
const Epics = require('./EpicsModel');

const storiesSchema = new Schema({
  id: {
    type: Number,
    required: true,
    min: 1,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  epic: {
    type: Schema.Types.ObjectId,
    ref: Epics,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: Users,
    required: false
  },
  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: Users,
    required: false
  }],
  points: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 5,
  },
  created: {
    type: Date,
    default: Date.now,
    required: false
  },
  due: {
    type: Date,
    required: false
  },
  started: {
    type: Date,
    required: false
  },
  finished: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    enum: ['todo', 'running', 'done'],
    required: false,
    default: 'todo'
  },
  icon: {
    type: String,
    required: false
  }
});
const Stories = model('Stories', storiesSchema);
module.exports = Stories;
