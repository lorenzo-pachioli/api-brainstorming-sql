const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  AllTasksService,
  NewTasksService,
  TasksServiceById,
  TasksDeleteByIdService,
  ModifyTasksServiceById
} = require('../services/TasksService');
const { isNewTaskValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.AllTasksController = (token, res) => {

  isTokenValid(token, res) && AllTasksService(res).catch(() => next(newError(`Couldn't get tasks list`, 500)));
}

exports.NewTasksController = (token, newTask, res) => {

  if (
    isTokenValid(token, res) &&
    isNewTaskValid(newTask, res)) {
    NewTasksService(newTask, res).catch(() => next(newError(`Couldn't save task`, 500)));
  }
}

exports.TasksControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && TasksServiceById(id, res).catch(() => next(newError(`Couldn't get task`, 500)));
}

exports.TasksDeleteControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && TasksDeleteByIdService(id, res).catch(() => next(newError(`Couldn't get task`, 500)));
}

exports.ModifyTasksControllerById = (token, newTask, res) => {

  if (
    isIdAndTokenValid(newTask.id, token, res) &&
    isNewTaskValid(newTask, res)) {
    ModifyTasksServiceById(newTask, res).catch(() => next(newError(`Couldn't update task`, 500)));
  }
}
