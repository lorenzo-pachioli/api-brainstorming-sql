const Projects = require('../models/ProjectsModel');
const { createProjects } = require('../../utils/modelCreators');
const Epics = require('../models/EpicsModel');

exports.NewProjectService = async (newProject, res) => {

  try {

    const projectAlreadyExist = await Projects.findOne({ id: newProject.id });

    if (projectAlreadyExist) {
      return res.status(200).json({
        msj: `User already exist`,
        content: {}
      });
    }

    const project = createProjects(newProject);
    project.save();
    res.status(200).json({
      msj: `Project created succesfully`,
      content: project
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json({
      msj: `Couldn't save epic`,
      content: {}
    });
  }
}

exports.AllProjectService = async (res) => {

  try {

    const projectsList = await Projects.find();

    res.status(200).json({
      msj: `Project list`,
      content: projectsList
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json({
      msj: `Couldn't get project list`,
      content: []
    });
  }
}

exports.ProjectServiceById = async (id, res) => {

  try {
    const projectById = await Projects.findOne({ id: id });

    if (projectById) {
      return res.status(200).json({
        msj: `Project ${id}`,
        content: projectById
      });
    }
    return res.status(200).json({
      msj: `Project ${id} doesn't exist`,
      content: {}
    });
  } catch (err) {
    res.status(400).json({
      msj: `Couldn't get project`,
      content: {}
    });
  }
}

exports.ProjectServiceByIdAllEpics = async (id, res) => {

  try {
    const projectById = await Projects.findOne({ id: id });

    if (!projectById) {
      return res.status(200).json({
        msj: `Project ${id} doesn't exist`,
        content: []
      });
    }

    const epicsList = await Epics.find({ project: projectById._id });
    if (epicsList.length > 0) {
      return res.status(200).json({
        msj: `Epics for project ${id}`,
        content: epicsList
      });
    }

    return res.status(200).json({
      msj: `There're no epics for project ${id}`,
      content: []
    });

  } catch (err) {
    res.status(400).json({
      msj: `Couldn't get epic list for project ${id}`,
      content: []
    });
  }
}
