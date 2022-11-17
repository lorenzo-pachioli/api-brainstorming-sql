const Tasks = require("../models/TasksModel");
const { createTask } = require('../helpers/modelCreators');
const { response, next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.AllTasksService = async () => {

  try {
    const tasksList = await Tasks.find();

    return response(`Tasks list`, 200, tasksList);

  } catch (err) {
    next(newError(`Couldn't get tasks list`, 500));
  }
}

exports.NewTasksService = async (newTask) => {

  try {
    const taskAlreadyExist = await Tasks.findOne({ name: newTask.name });
    if (taskAlreadyExist) return response(`Task with name '${newTask.name}' already exist`, 200, {});

    const tasksList = await Tasks.find();
    const newMaxId = tasksList.length + 1;
    const task = createTask(newMaxId, newTask);
    task.save();

    return response(`Task created succesfully`, 200, task);

  } catch (err) {
    next(newError(`Couldn't save task`, 500));
  }
}

exports.TasksServiceById = async (id) => {

  try {
    const taskById = await Tasks.findOne({ id: id });
    if (taskById) return response(`Task ${id}`, 200, taskById);

    return response(`Task ${id} doesn't exist`, 200, {});

  } catch (err) {
    next(newError(`Couldn't get task`, 500));
  }
}

exports.ModifyTasksServiceById = async (newTask) => {

  try {
    const taskUpdated = await Tasks.findOneAndUpdate({ _id: newTask._id }, newTask, { new: true });
    if (taskUpdated) return response(`Task ${newTask.id} updated`, 200, taskUpdated);

    const taskExist = await Tasks.findById(newTask._id);
    if (!taskExist) return response(`Task ${newTask._id} doesn't exist`, 200, {});

    return response(`Couldn't update task`, 200, {});

  } catch (err) {
    next(newError(`Couldn't update task`, 500));
  }
}
