const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { isNewProjectValid } = require('../helpers/newItemsValidator');
const {
  AllProjectService,
  NewProjectService,
  ProjectServiceById,
  ProjectServiceByIdAllEpics,
  ProjectDeleteByIdService
} = require('../services/ProjectsService');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewProjectController = (token, newProject, res) => {

  if (isTokenValid(token, res) && isNewProjectValid(newProject, res)) {
    NewProjectService(newProject, res).catch(() => next(newError(`Couldn't save project`, 500)));
  }
}

exports.AllProjectController = (token, res) => {

  const userId = isTokenValid(token, res);
  userId && AllProjectService(userId, res).catch(() => next(newError(`Couldn't get project list`, 500)));
}

exports.ProjectControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && ProjectServiceById(id, res).catch(() => next(newError(`Couldn't get project list`, 500)));
}

exports.ProjectControllerByIdAllEpics = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && ProjectServiceByIdAllEpics(id, res).catch(() => next(newError(`Couldn't get epic list for project ${id}`, 500)));
}

exports.ProjectDeleteByIdController = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && ProjectDeleteByIdService(id, res).catch(() => next(newError(`Couldn't delete project`, 500)));
}
