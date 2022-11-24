const Epics = require('../models/EpicsModel');
const Stories = require('../models/StoriesModel');
const Projects = require('../models/ProjectsModel');
const UsersBrainstorming = require('../models/UsersModel');
const Tasks = require('../models/TasksModel');

exports.createEpics = (id, newEpic) => {

  const { project, name, description, icon } = newEpic;

  const epic = Epics({
    id,
    project,
    name,
    description: description && description,
    icon: icon && icon
  });

  return epic;
}

exports.createUsers = (id, newUser) => {

  const { email, username, password, name } = newUser;

  const user = UsersBrainstorming({
    id,
    email,
    username,
    password,
    name
  });

  return user;
}

exports.createProjects = (id, newProject) => {

  const { name, members, description, icon } = newProject;

  const project = Projects({
    id,
    name,
    members,
    description: description && description,
    icon: icon && icon
  });

  return project;
}

exports.createStories = (id, newStory) => {

  const {
    name,
    epic,
    description,
    owner,
    assignedTo,
    points,
    created,
    due,
    started,
    finished,
    status,
    icon
  } = newStory;

  const story = Stories({
    id,
    name,
    epic,
    description: description && description,
    owner: owner && owner,
    assignedTo: assignedTo && assignedTo,
    points: points && points,
    created: created && created,
    due: due && due,
    started: started && started,
    finished: finished && finished,
    status: status && status,
    icon: icon && icon
  });

  return story;
}

exports.createTask = (id, newTask) => {

  const {
    name,
    description,
    story,
    created,
    dueDate,
    done,
    icon
  } = newTask;

  const task = Tasks({
    id,
    name,
    story,
    description: description && description,
    created: created && created,
    dueDate: dueDate && dueDate,
    done: done && done,
    icon: icon && icon
  });

  return task;
}
