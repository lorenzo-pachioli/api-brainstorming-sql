const Tasks = require("../models/TasksModel");
const { createTask } = require('../../utils/modelCreators');

exports.AllTasksService = async (res) => {

  try {
    const tasksList = await Tasks.find();

    res.status(200).json({
      msj: `Tasks list`,
      content: tasksList
    });

  } catch (err) {
    console.log('error', err);
    res.status(503).json({
      msj: `Couldn't get tasks list`,
      content: []
    });
  }
}

exports.NewTasksService = async (newTask, res) => {

  try {
    const taskAlreadyExist = await Tasks.findOne({ id: newTask.id });

    if (taskAlreadyExist) {
      return res.status(200).json({
        msj: `Task already exist`,
        content: {}
      });
    }

    const task = createTask(newTask);
    task.save();
    res.status(200).json({
      msj: `Task created succesfully`,
      content: task
    });

  } catch (err) {
    console.log('error', err);
    res.status(503).json({
      msj: `Couldn't save task`,
      content: {}
    });
  }
}

exports.TasksServiceById = async (id, res) => {

  try {
    const taskById = await Tasks.findOne({ id: id });

    if (taskById) {
      return res.status(200).json({
        msj: `Task ${id}`,
        content: taskById
      });
    }
    return res.status(200).json({
      msj: `Task ${id} doesn't exist`,
      content: {}
    });
  } catch (err) {
    console.log(err);
    res.status(503).json({
      msj: `Couldn't get task`,
      content: {}
    });
  }
}

exports.ModifyTasksServiceById = async (newTask, res) => {

  try {
    const taskUpdated = await Tasks.findOneAndUpdate({ _id: newTask._id }, newTask, { new: true });
    if (taskUpdated) {
      return res.status(200).json({
        msj: `Task ${newTask.id} updated`,
        content: taskUpdated
      });
    }

    const taskExist = await Tasks.findById(newTask._id);
    if (!taskExist) {
      return res.status(200).json({
        msj: `Task ${newTask._id} doesn't exist`,
        content: {}
      });
    }

    res.status(200).json({
      msj: `Couldn't update task`,
      content: {}
    });

  } catch (err) {
    console.log(err);
    res.status(503).json({
      msj: `Couldn't update task`,
      content: {}
    });
  }
}
