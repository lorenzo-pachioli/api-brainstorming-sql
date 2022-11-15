const { Schema, model } = require('mongoose');
const Users = require('./UsersModel');

const projectsSchema = new Schema({
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
  members: [{
    type: Schema.Types.ObjectId,
    ref: Users,
    required: true
  }],
  description: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  }
});
const Projects = model('Projects', projectsSchema);
module.exports = Projects;