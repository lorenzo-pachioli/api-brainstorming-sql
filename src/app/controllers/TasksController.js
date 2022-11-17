const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  AllTasksService,
  NewTasksService,
  TasksServiceById,
  ModifyTasksServiceById
} = require('../services/TasksService');
const { isNewTaskValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.AllTasksController = (token) => {

  isTokenValid(token) && AllTasksService().catch(() => next(newError(`Couldn't get tasks list`, 500)));
}

exports.NewTasksController = (token, newTask) => {

  if (
    isTokenValid(token) &&
    isNewTaskValid(newTask)) {
    NewTasksService(newTask).catch(() => next(newError(`Couldn't save task`, 500)));
  }
}

exports.TasksControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && TasksServiceById(id).catch(() => next(newError(`Couldn't get task`, 500)));
}

exports.ModifyTasksControllerById = (token, newTask) => {

  if (
    isIdAndTokenValid(newTask.id, token) &&
    isNewTaskValid(newTask)) {
    ModifyTasksServiceById(newTask).catch(() => next(newError(`Couldn't update task`, 500)));
  }
}
