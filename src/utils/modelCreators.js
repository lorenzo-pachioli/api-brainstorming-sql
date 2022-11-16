const Epics = require('../app/models/EpicsModel');
const Stories = require('../app/models/StoriesModel');
const Projects = require('../app/models/ProjectsModel');
const UsersBrainstorming = require('../app/models/UsersModel');
const Tasks = require('../app/models/TasksModel');

exports.createEpics = (newEpic) => {
  const { id, project, name, description, icon } = newEpic;
  if (!project || !name) {
    return;
  }

  const epic = Epics({
    id: id,
    project: project,
    name: name,
    description: description && description,
    icon: icon && icon
  });

  return epic;
}

exports.createUsers = (id, newUser) => {

  if (!newUser.email || !newUser.username || !newUser.password) {
    return;
  }

  const user = UsersBrainstorming({
    id: id,
    email: newUser.email,
    username: newUser.username,
    password: newUser.password
  });

  return user;
}

exports.createProjects = (newProject) => {

  const { id, name, members, description, icon } = newProject;

  if (!id || !name || !members) {
    return;
  }

  const project = Projects({
    id: id,
    name: name,
    members: members,
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

  if (!id || !name || !epic) {
    return;
  }

  const story = Stories({
    id: id,
    name: name,
    epic: epic,
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

  if (!id || !name || !story) {
    return;
  }

  const task = Tasks({
    id: id,
    name: name,
    story: story,
    description: description && description,
    created: created && created,
    dueDate: dueDate && dueDate,
    done: done && done,
    icon: icon && icon
  });

  return task;
}
