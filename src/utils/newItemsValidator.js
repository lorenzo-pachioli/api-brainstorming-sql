const {
  isNameValid,
  isDescriptionValid,
  isObjectIdValid,
  isArrayOfObjIdValid,
  isDateValid
} = require('./inputsValidator');
const { response } = require('./response');

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
  if (!isNameValid(name, res)) return false;

  //Validate description
  if (description && !isDescriptionValid(description, res)) return false;

  //Validate project members id
  if (!isArrayOfObjIdValid(members)) return response('Project members id invalid', 400, res);

  return true;
}

exports.isNewEpicValid = (newEpic, res) => {
  const { id, project, name, description } = newEpic;

  //Validate required info
  if (!id || !name || !project) return response('Incorrect new project', 400, res);

  //Validate name
  if (!isNameValid(name, res)) return false;

  //Validate description
  if (description && !isDescriptionValid(description, res)) return false;

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
  if (!isNameValid(name, res)) return false;

  //Validate description
  if (description && !isDescriptionValid(description, res)) return false;

  //Validate epic id
  if (!isObjectIdValid(epic)) return response('Epic id invalid', 400, res);

  //Validate owner
  if (owner && !isObjectIdValid(owner)) return response('Owner id invalid', 400, res);

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
