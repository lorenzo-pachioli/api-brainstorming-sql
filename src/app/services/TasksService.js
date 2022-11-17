const Tasks = require("../models/TasksModel");
const { createTask } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.AllTasksService = async () => {

  const tasksList = await Tasks.find();

  return response(`Tasks list`, 200, tasksList);
}

exports.NewTasksService = async (newTask) => {

  const taskAlreadyExist = await Tasks.findOne({ name: newTask.name });
  if (taskAlreadyExist) return response(`Task with name '${newTask.name}' already exist`, 200, {});

  const tasksList = await Tasks.find();
  const newMaxId = tasksList.length + 1;
  const task = createTask(newMaxId, newTask);
  task.save();

  return response(`Task created succesfully`, 200, task);
}

exports.TasksServiceById = async (id) => {

  const taskById = await Tasks.findOne({ id: id });
  if (taskById) return response(`Task ${id}`, 200, taskById);

  return response(`Task ${id} doesn't exist`, 200, {});
}

exports.ModifyTasksServiceById = async (newTask) => {

  const taskUpdated = await Tasks.findOneAndUpdate({ _id: newTask._id }, newTask, { new: true });
  if (taskUpdated) return response(`Task ${newTask.id} updated`, 200, taskUpdated);

  const taskExist = await Tasks.findById(newTask._id);
  if (!taskExist) return response(`Task ${newTask._id} doesn't exist`, 200, {});

  return response(`Couldn't update task`, 200, {});
}
