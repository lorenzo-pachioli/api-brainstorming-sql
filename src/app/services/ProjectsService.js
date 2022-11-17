const Projects = require('../models/ProjectsModel');
const Epics = require('../models/EpicsModel');
const { createProjects } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewProjectService = async (newProject, res) => {

  const projectAlreadyExist = await Projects.findOne({ name: newProject.name });
  if (projectAlreadyExist) return response(`Project with name '${newProject.name}' already exist`, res, 200, {});

  const projectsList = await Projects.find();
  const newMaxId = projectsList.length + 1;
  const project = createProjects(newMaxId, newProject);
  project.save();

  return response(`Project created succesfully`, res, res, 200, project);
}

exports.AllProjectService = async (res) => {

  const projectsList = await Projects.find();

  return response(`Project list`, res, 200, projectsList);
}

exports.ProjectServiceById = async (id, res) => {

  const projectById = await Projects.findOne({ id: id });
  if (projectById) return response(`Project ${id} doesn't exist`, res, 200, projectById);

  return response(`Project list`, res, 200, {});
}

exports.ProjectServiceByIdAllEpics = async (id, res) => {

  const projectById = await Projects.findOne({ id: id });
  if (!projectById) return response(`Project ${id} doesn't exist`, res, 200);

  const epicsList = await Epics.find({ project: projectById._id });
  if (epicsList.length > 0) return response(`Epics for project ${id}`, res, 200, epicsList);

  return response(`There're no epics for project ${id}`, res, 200);
}
