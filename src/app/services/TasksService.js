const Tasks = require("../models/TasksModel");
const { createTask } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.AllTasksService = async (res) => {

  const tasksList = await Tasks.find();

  return response(`Tasks list`, res, 200, tasksList);
}

exports.NewTasksService = async (newTask, res) => {

  const taskAlreadyExist = await Tasks.findOne({ name: newTask.name });
  if (taskAlreadyExist) return response(`Task with name '${newTask.name}' already exist`, res, 200, {});

  const tasksList = await Tasks.find();
  const newMaxId = tasksList.length + 1;
  const task = createTask(newMaxId, newTask);
  task.save();

  return response(`Task created succesfully`, res, 200, task);
}

exports.TaskByIdService = async (id, res) => {

  const taskById = await Tasks.findOne({ id: id });
  if (taskById) return response(`Task ${id}`, res, 200, taskById);

  return response(`Task ${id} doesn't exist`, res, 200, {});
}

exports.TasksDeleteByIdService = async (id, res) => {

  const taskById = await Tasks.remove({ id: id });
  if (taskById) return response(`Task ${id}`, res, 200, taskById);

  return response(`Task ${id} doesn't exist`, res, 200, {});
}

exports.ModifyTasksByIdService = async (newTask, res) => {

  const taskUpdated = await Tasks.findOneAndUpdate({ _id: newTask._id }, newTask, { new: true });
  if (taskUpdated) return response(`Task ${newTask.id} updated`, res, 200, taskUpdated)

  return response(`Couldn't update task`, res, 200, {});
}
