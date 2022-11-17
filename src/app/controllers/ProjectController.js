const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { isNewProjectValid } = require('../helpers/newItemsValidator');
const { AllProjectService, NewProjectService, ProjectServiceById, ProjectServiceByIdAllEpics } = require('../services/ProjectsService');

exports.NewProjectController = (token, newProject) => {

  if (isTokenValid(token) && isNewProjectValid(newProject)) {
    NewProjectService(newProject);
  }
}

exports.AllProjectController = (token) => {

  isTokenValid(token) && AllProjectService();
}

exports.ProjectControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && ProjectServiceById(id);
}

exports.ProjectControllerByIdAllEpics = (token, id) => {

  isIdAndTokenValid(id, token) && ProjectServiceByIdAllEpics(id);
}
