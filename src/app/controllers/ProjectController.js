const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { isNewProjectValid } = require('../helpers/newItemsValidator');
const {
  AllProjectService,
  NewProjectService,
  ProjectServiceById,
  ProjectServiceByIdAllEpics
} = require('../services/ProjectsService');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewProjectController = (token, newProject) => {

  if (isTokenValid(token) && isNewProjectValid(newProject)) {
    NewProjectService(newProject).catch(() => next(newError(`Couldn't save project`, 500)));
  }
}

exports.AllProjectController = (token) => {

  isTokenValid(token) && AllProjectService().catch(() => next(newError(`Couldn't get project list`, 500)));
}

exports.ProjectControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && ProjectServiceById(id).catch(() => next(newError(`Couldn't get project list`, 500)));
}

exports.ProjectControllerByIdAllEpics = (token, id) => {

  isIdAndTokenValid(id, token) && ProjectServiceByIdAllEpics(id).catch(() => next(newError(`Couldn't get epic list for project ${id}`, 500)));
}
