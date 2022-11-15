const { Schema, model } = require('mongoose');

const tasksSchema = new Schema({
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
  story: {
    type: Schema.Types.ObjectId,
    ref: story,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: false
  },
  dueDate: {
    type: Date,
    required: false
  },
  done: {
    type: Boolean,
    required: false,
    default: false
  }
});
const Tasks = model('Tasks', tasksSchema);
module.exports = Tasks;
