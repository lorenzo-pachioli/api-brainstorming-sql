const Projects = require('../models/ProjectsModel');
const Epics = require('../models/EpicsModel');
const { createProjects } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewProjectService = async (newProject, res) => {

  const projectAlreadyExist = await Projects.findOne({ name: newProject.name, members: [newProject.members] });
  if (projectAlreadyExist) return response(`Project with name '${newProject.name}' already exist`, res, 200, {});

  const projectsList = await Projects.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = projectsList ? projectsList.id + 1 : 1;
  const project = createProjects(newMaxId, newProject);
  project.save();

  return response(`Project created succesfully`, res, 200, project);
}

exports.AllProjectService = async (userId, res) => {

  const projectsList = await Projects.find({ userId: userId });

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

exports.ProjectDeleteByIdService = async (id, res) => {

  const projectById = await Projects.deleteOne({ id: id });
  if (projectById.deletedCount > 0) return response(`Project ${id}`, res, 200, {});

  return response(`Project ${id} doesn't exist`, res, 200, {});
}
