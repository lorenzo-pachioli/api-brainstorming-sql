const Epics = require('../app/models/EpicsModel');
const Stories = require('../app/models/StoriesModel');
const Projects = require('../app/models/ProjectsModel');
const UsersBrainstorming = require('../app/models/UsersModel');

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
