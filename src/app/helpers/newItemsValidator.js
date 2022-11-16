const {
  isNameValid,
  isDescriptionValid,
  isObjectIdValid,
  isArrayOfObjIdValid,
  isDateValid
} = require('../../utils/inputsValidator');
const { response } = require('../../utils/response');

exports.isNewUserValid = (newUser, res) => {

  const { email, password, username } = newUser;
  const regExEmail = /^[-\w.%+]{1,30}@(?:[A-Z0-9-]{4,30}\.)[A-Z]{2,20}$/i;
  const onlyNumbers = /^(.*\d){6,15}$/;

  //Validate required info
  if (!email || !password || !username) return response('Incorrect new user', 400, res);

  //Validate email
  if (!regExEmail.test(email)) return response('Incorrect email', 400, res);

  //Validate password
  if (!onlyNumbers.test(password) || typeof password !== 'string') return response('Incorrect password', 400, res);

  //Validate username
  if (username.length < 4) return response('Incorrect username', 400, res);

  return true;
}

exports.isNewProjectValid = (newProject, res) => {
  const { name, members, description } = newProject;

  //Validate required info
  if (!name || !members) return response('Incorrect new project', 400, res);

  //Validate name
  if (!isNameValid(name)) return response('Project name is invalid', 400, res);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Project description is invalid', 400, res);

  //Validate project members id
  if (!isArrayOfObjIdValid(members)) return response('Project members id invalid', 400, res);

  return true;
}

exports.isNewEpicValid = (newEpic, res) => {
  const { id, project, name, description } = newEpic;

  //Validate required info
  if (!id || !name || !project) return response('Incorrect new project', 400, res);

  //Validate name
  if (!isNameValid(name)) return response('Epic name is invalid', 400, res);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Epic description is invalid', 400, res);;

  //Validate project id
  if (!isObjectIdValid(project)) return response('Project id invalid', 400, res);

  return true;
}

exports.isNewStoryValid = (newStory, res) => {
  const {
    id,
    name,
    epic,
    description,
    owner,
    assignedTo,
    points,
    created,
    due,
    started,
    finished,
    status
  } = newStory;

  //Validate required info
  if (!id || !name || !epic) return response('Incorrect new story', 400, res);

  //Validate name
  if (!isNameValid(name)) return response('Story name is invalid', 400, res);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Story description is invalid', 400, res);

  //Validate epic id
  if (!isObjectIdValid(epic)) return response('Epic id invalid', 400, res);

  //Validate owner
  if (owner && !isObjectIdValid(owner)) return response('Story owner id invalid', 400, res);

  //Validate assignedTo
  if (assignedTo && !isArrayOfObjIdValid(assignedTo)) return response('Story assignedTo id invalid', 400, res);

  //Validate points
  if (points && points < 0 && points > 5 && !Number.isInteger(points)) return response('Story points is invalid', 400, res);

  //Validate status
  if (status && status !== 'todo' && status !== 'running' && status !== 'done') return response('Story status is invalid', 400, res);

  //Validate created
  if (created && !isDateValid(created)) return response('Story created date is invalid', 400, res);

  //Validate started
  if (started && !isDateValid(started)) return response('Story started date is invalid', 400, res);

  //Validate due
  if (due && !isDateValid(due)) return response('Story due date is invalid', 400, res);

  //Validate finished
  if (finished && !isDateValid(finished)) return response('Story finished date is invalid', 400, res);

  return true;
}

exports.isNewTaskValid = (newTask, res) => {
  const {
    _id,
    id,
    name,
    description,
    story,
    created,
    dueDate,
    done
  } = newTask;

  //Validate required info
  if (!id || !name || !story) return response('Incorrect new task', 400, res);

  //Validate _id
  if (!isObjectIdValid(_id)) return response('Task _id invalid', 400, res);

  //Validate name
  if (!isNameValid(name)) return response('Task name is invalid', 400, res);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Task description is invalid', 400, res);

  //Validate story id
  if (!isObjectIdValid(story)) return response('Story id invalid', 400, res);

  //Validate created
  if (created && !isDateValid(created)) return response('Task created date is invalid', 400, res);

  //Validate dueDate
  if (dueDate && !isDateValid(dueDate)) return response('Task dueDate is invalid', 400, res);

  //Validate done
  if (done && typeof done == "boolean") return response('Task done is invalid', 400, res);

  return true;
}
