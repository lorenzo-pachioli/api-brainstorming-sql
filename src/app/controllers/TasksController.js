const { tokenValidator } = require('../../utils/tokenValidator');
const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { TasksService, NewTasksService, TasksServiceById, ModifyTasksServiceById } = require('../services/TasksService');

exports.TasksController = (token, res) => {

  isTokenValid(token, res) && TasksService(res);
}

exports.NewTasksController = (token, newTask, res) => {

  if (!tokenValidator(token)) {
    return res.status(401).json({
      msj: 'Unauthorized'
    });
  }

  if (!newTask.name || newTask.name.length < 4) {
    return res.status(400).json({
      msj: 'Incorrect task name'
    });
  }

  if (newTask.description && newTask.description.length < 10) {
    return res.status(400).json({
      msj: 'Incorrect task description'
    });
  }

  NewTasksService(newTask, res);
}

exports.TasksControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && TasksServiceById(id, res);
}

exports.ModifyTasksControllerById = (token, newTask, res) => {

  if (!tokenValidator(token)) {
    return res.status(401).json({
      msj: 'Unauthorized'
    });
  }

  if (!newTask.name || newTask.name.length < 4) {
    return res.status(400).json({
      msj: 'Incorrect task name'
    });
  }

  if (newTask.description && newTask.description.length < 10) {
    return res.status(400).json({
      msj: 'Incorrect task description'
    });
  }

  ModifyTasksServiceById(newTask, res);
}
