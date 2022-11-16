const Tasks = require("../models/TasksModel");
const { createTask } = require('../../utils/modelCreators');
const { response } = require('../../utils/response');

exports.AllTasksService = async (res) => {

  try {
    const tasksList = await Tasks.find();

    return response(`Tasks list`, 200, res, tasksList);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get tasks list`, 503, res);
  }
}

exports.NewTasksService = async (newTask, res) => {

  try {
    const taskAlreadyExist = await Tasks.findOne({ id: newTask.id });
    if (taskAlreadyExist) return response(`Task already exist`, 200, res, {});

    const task = createTask(newTask);
    task.save();

    return response(`Task created succesfully`, 200, res, task);

  } catch (err) {
    console.log(err);
    return response(`Couldn't save task`, 503, res);
  }
}

exports.TasksServiceById = async (id, res) => {

  try {
    const taskById = await Tasks.findOne({ id: id });
    if (taskById) return response(`Task ${id}`, 200, res, taskById);

    return response(`Task ${id} doesn't exist`, 200, res, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't get task`, 503, res);
  }
}

exports.ModifyTasksServiceById = async (newTask, res) => {

  try {
    const taskUpdated = await Tasks.findOneAndUpdate({ _id: newTask._id }, newTask, { new: true });
    if (taskUpdated) return response(`Task ${newTask.id} updated`, 200, res, taskUpdated);

    const taskExist = await Tasks.findById(newTask._id);
    if (!taskExist) return response(`Task ${newTask._id} doesn't exist`, 200, res, {});

    return response(`Couldn't update task`, 200, res, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't update task`, 503, res);
  }
}
