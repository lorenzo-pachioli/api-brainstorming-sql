const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { AllTasksService, NewTasksService, TasksServiceById, ModifyTasksServiceById } = require('../services/TasksService');
const { isNewTaskValid } = require('../helpers/newItemsValidator');

exports.AllTasksController = (token, res) => {

  isTokenValid(token, res) && AllTasksService(res);
}

exports.NewTasksController = (token, newTask, res) => {

  if (
    isTokenValid(token, res) &&
    isNewTaskValid(newTask, res)) {
    NewTasksService(newTask, res);
  }

}

exports.TasksControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && TasksServiceById(id, res);
}

exports.ModifyTasksControllerById = (token, newTask, res) => {

  if (
    isIdAndTokenValid(newTask.id, token, res) &&
    isNewTaskValid(newTask, res)) {
    ModifyTasksServiceById(newTask, res);
  }


}
