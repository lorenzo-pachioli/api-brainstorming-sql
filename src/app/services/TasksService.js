const Tasks = require("../models/TasksModel");
const { createTask } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');
const Stories = require("../models/StoriesModel");

exports.AllTasksService = async (id, res) => {

  const storiesList = await Stories.find({ assignedTo: [id] });
  const ids = storiesList.map(s => `${s._id}`);
  const tasksList = await Tasks.find({ story: { $in: ids } });

  return response(`Tasks list`, res, 200, tasksList);
}

exports.NewTasksService = async (newTask, res) => {

  const taskAlreadyExist = await Tasks.findOne({ name: newTask.name });
  if (taskAlreadyExist) return response(`Task with name '${newTask.name}' already exist`, res, 200, {});

  const lastTask = await Tasks.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = lastTask ? lastTask.id + 1 : 1;
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

  const taskById = await Tasks.deleteOne({ id: id });
  if (taskById.deletedCount > 0) return response(`Task ${id}`, res, 200, taskById);

  return response(`Task ${id} doesn't exist`, res, 200, {});
}

exports.ModifyTasksByIdService = async (newTask, res) => {

  const taskUpdated = await Tasks.findOneAndUpdate({ _id: newTask._id }, newTask, { new: true });
  if (taskUpdated) return response(`Task ${newTask.id} updated`, res, 200, taskUpdated)

  return response(`Couldn't update task`, res, 200, {});
}
