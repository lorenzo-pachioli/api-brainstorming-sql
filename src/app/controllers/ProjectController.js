const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { ProjectService, ProjectServiceById, ProjectServiceByIdAllEpics } = require('../services/ProjectsService');

exports.ProjectController = (token, res) => {

  isTokenValid(token, res) && ProjectService(res);
}

exports.ProjectControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && ProjectServiceById(id, res);
}

exports.ProjectControllerByIdAllEpics = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && ProjectServiceByIdAllEpics(id, res);
}
