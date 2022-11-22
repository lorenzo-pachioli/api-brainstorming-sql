const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  AllTasksService,
  NewTasksService,
  TaskByIdService,
  TasksDeleteByIdService,
  ModifyTasksByIdService
} = require('../services/TasksService');
const { isNewTaskValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.AllTasksController = (token, res) => {
  const userId = isTokenValid(token, res);
  userId && AllTasksService(userId, res).catch(() => next(newError(`Couldn't get tasks list`, 500)));
}

exports.NewTasksController = (token, newTask, res) => {

  if (
    isTokenValid(token, res) &&
    isNewTaskValid(newTask, res)) {
    NewTasksService(newTask, userId, res).catch(() => next(newError(`Couldn't save task`, 500)));
  }
}

exports.TasksControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && TaskByIdService(id, res).catch(() => next(newError(`Couldn't get task`, 500)));
}

exports.TasksDeleteByIdController = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && TasksDeleteByIdService(id, res).catch((err) => next(newError(`Couldn't get task`, 500)));
}

exports.ModifyTasksByIdController = (token, newTask, res) => {

  if (
    isIdAndTokenValid(newTask.id, token, res) &&
    isNewTaskValid(newTask, res)) {
    ModifyTasksByIdService(newTask, res).catch(() => next(newError(`Couldn't update task`, 500)));
  }
}
