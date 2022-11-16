const Epics = require('../app/models/EpicsModel');
const Stories = require('../app/models/StoriesModel');
const Projects = require('../app/models/ProjectsModel');
const UsersBrainstorming = require('../app/models/UsersModel');
const Tasks = require('../app/models/TasksModel');

exports.createEpics = (newEpic) => {

  const { id, project, name, description, icon } = newEpic;

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

  const { email, username, password } = newUser;

  const user = UsersBrainstorming({
    id,
    email,
    username,
    password
  });

  return user;
}

exports.createProjects = (newProject) => {

  const { id, name, members, description, icon } = newProject;

  const project = Projects({
    id,
    name,
    members,
    description: description && description,
    icon: icon && icon
  });

  return project;
}

exports.createStories = (newStory) => {

  const {
    id,
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

exports.createTask = (newTask) => {

  const {
    id,
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
