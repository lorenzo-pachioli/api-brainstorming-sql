const Projects = require('../models/ProjectsModel');
const Epics = require('../models/EpicsModel');
const { createProjects } = require('../helpers/modelCreators');
const { response, next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewProjectService = async (newProject) => {

  try {
    const projectAlreadyExist = await Projects.findOne({ name: newProject.name });
    if (projectAlreadyExist) return response(`Project with name '${newProject.name}' already exist`, 200, {});

    const projectsList = await Projects.find();
    const newMaxId = projectsList.length + 1;
    const project = createProjects(newMaxId, newProject);
    project.save();

    return response(`Project created succesfully`, 200, project);

  } catch (err) {
    next(newError(`Couldn't save project`, 500));
  }
}

exports.AllProjectService = async () => {

  try {
    const projectsList = await Projects.find();

    return response(`Project list`, 200, projectsList);

  } catch (err) {
    next(newError(`Couldn't get project list`, 500));
  }
}

exports.ProjectServiceById = async (id) => {

  try {
    const projectById = await Projects.findOne({ id: id });
    if (projectById) return response(`Project ${id} doesn't exist`, 200, projectById);

    return response(`Project list`, 200, {});

  } catch (err) {
    next(newError(`Couldn't get project list`, 500));
  }
}

exports.ProjectServiceByIdAllEpics = async (id) => {

  try {
    const projectById = await Projects.findOne({ id: id });
    if (!projectById) return response(`Project ${id} doesn't exist`, 200);

    const epicsList = await Epics.find({ project: projectById._id });
    if (epicsList.length > 0) return response(`Epics for project ${id}`, 200, epicsList);

    return response(`There're no epics for project ${id}`, 200);

  } catch (err) {
    next(newError(`Couldn't get epic list for project ${id}`, 500));
  }
}
