const { isIdInteger } = require('../../utils/idValidators');
const { tokenValidator } = require('../../utils/tokenValidator');

exports.TasksController = (token, res) => {

  if (!tokenValidator(token)) {
    return res.status(401).json({
      msj: 'Unauthorized'
    });
  }

  res.status(200).json({
    msj: 'correct tasks'
  });
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

  res.status(200).json({
    msj: 'correct tasks'
  });
}

exports.TasksControllerById = (token, id, res) => {

  if (!tokenValidator(token)) {
    return res.status(401).json({
      msj: 'Unauthorized'
    });
  }

  if (!isIdInteger(id)) {
    return res.status(400).json({
      msj: 'Incorrect id number'
    });
  }

  res.status(200).json({
    msj: 'correct tasks'
  });
}