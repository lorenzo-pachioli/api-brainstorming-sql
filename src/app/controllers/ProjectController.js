const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { isNewProjectValid } = require('../helpers/newItemsValidator');
const { AllProjectService, NewProjectService, ProjectServiceById, ProjectServiceByIdAllEpics } = require('../services/ProjectsService');

exports.NewProjectController = (token, newProject, res) => {

  if (isIdAndTokenValid(newProject.id, token, res) && isNewProjectValid(newProject, res)) {
    NewProjectService(newProject, res);
  }
}

exports.AllProjectController = (token, res) => {

  isTokenValid(token, res) && AllProjectService(res);
}

exports.ProjectControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && ProjectServiceById(id, res);
}

exports.ProjectControllerByIdAllEpics = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && ProjectServiceByIdAllEpics(id, res);
}
