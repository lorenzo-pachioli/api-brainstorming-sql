const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { AllTasksService, NewTasksService, TasksServiceById, ModifyTasksServiceById } = require('../services/TasksService');
const { isNewTaskValid } = require('../helpers/newItemsValidator');

exports.AllTasksController = (token) => {

  isTokenValid(token) && AllTasksService();
}

exports.NewTasksController = (token, newTask) => {

  if (
    isTokenValid(token) &&
    isNewTaskValid(newTask)) {
    NewTasksService(newTask);
  }

}

exports.TasksControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && TasksServiceById(id);
}

exports.ModifyTasksControllerById = (token, newTask) => {

  if (
    isIdAndTokenValid(newTask.id, token) &&
    isNewTaskValid(newTask)) {
    ModifyTasksServiceById(newTask);
  }


}
