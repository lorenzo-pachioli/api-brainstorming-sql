const {
  isNameValid,
  isDescriptionValid,
  isObjectIdValid,
  isArrayOfObjIdValid,
  isDateValid
} = require('../../utils/inputsValidator');
const { response } = require('../../utils/response');

exports.isNewUserValid = (newUser) => {

  const { email, password, username } = newUser;
  const regExEmail = /^[-\w.%+]{1,30}@(?:[A-Z0-9-]{4,30}\.)[A-Z]{2,20}$/i;
  const onlyNumbers = /^(.*\d){6,15}$/;

  //Validate required info
  if (!email || !password || !username) return response('Incorrect new user', 400);

  //Validate email
  if (!regExEmail.test(email)) return response('Incorrect email', 400);

  //Validate password
  if (!onlyNumbers.test(password) || typeof password !== 'string') return response('Incorrect password', 400);

  //Validate username
  if (username.length < 4) return response('Incorrect username', 400);

  return true;
}

exports.isNewProjectValid = (newProject) => {
  const { name, members, description } = newProject;

  //Validate required info
  if (!name || !members) return response('Incorrect new project', 400);

  //Validate name
  if (!isNameValid(name)) return response('Project name is invalid', 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Project description is invalid', 400);

  //Validate project members id
  if (!isArrayOfObjIdValid(members)) return response('Project members id invalid', 400);

  return true;
}

exports.isNewEpicValid = (newEpic) => {
  const { project, name, description } = newEpic;

  //Validate required info
  if (!name || !project) return response('Incorrect new project', 400);

  //Validate name
  if (!isNameValid(name)) return response('Epic name is invalid', 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Epic description is invalid', 400);

  //Validate project id
  if (!isObjectIdValid(project)) return response('Project id invalid', 400);

  return true;
}

exports.isNewStoryValid = (newStory) => {
  const {
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
  if (!name || !epic) return response('Incorrect new story', 400);

  //Validate name
  if (!isNameValid(name)) return response('Story name is invalid', 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Story description is invalid', 400);

  //Validate epic id
  if (!isObjectIdValid(epic)) return response('Epic id invalid', 400);

  //Validate owner
  if (owner && !isObjectIdValid(owner)) return response('Story owner id invalid', 400);

  //Validate assignedTo
  if (assignedTo && !isArrayOfObjIdValid(assignedTo)) return response('Story assignedTo id invalid', 400);

  //Validate points
  if (points && points < 0 && points > 5 && !Number.isInteger(points)) return response('Story points is invalid', 400);

  //Validate status
  if (status && status !== 'todo' && status !== 'running' && status !== 'done') return response('Story status is invalid', 400);

  //Validate created
  if (created && !isDateValid(created)) return response('Story created date is invalid', 400);

  //Validate started
  if (started && !isDateValid(started)) return response('Story started date is invalid', 400);

  //Validate due
  if (due && !isDateValid(due)) return response('Story due date is invalid', 400);

  //Validate finished
  if (finished && !isDateValid(finished)) return response('Story finished date is invalid', 400);

  return true;
}

exports.isNewTaskValid = (newTask) => {
  const {
    name,
    description,
    story,
    created,
    dueDate,
    done
  } = newTask;

  //Validate required info
  if (!name || !story) return response('Incorrect new task', 400);

  //Validate name
  if (!isNameValid(name)) return response('Task name is invalid', 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Task description is invalid', 400);

  //Validate story id
  if (!isObjectIdValid(story)) return response('Story id invalid', 400);

  //Validate created
  if (created && !isDateValid(created)) return response('Task created date is invalid', 400);

  //Validate dueDate
  if (dueDate && !isDateValid(dueDate)) return response('Task dueDate is invalid', 400);

  //Validate done
  if (done && typeof done == "boolean") return response('Task done is invalid', 400);

  return true;
}
