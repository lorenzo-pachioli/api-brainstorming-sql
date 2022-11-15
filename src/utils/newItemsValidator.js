const { isNameValid, isDescriptionValid, isObjectIdValid, isArrayOfObjIdValid } = require('./inputsValidator');
exports.isNewUserValid = (newUser, res) => {

  const { email, password, username } = newUser;
  const regExEmail = /^[-\w.%+]{1,30}@(?:[A-Z0-9-]{4,30}\.)[A-Z]{2,20}$/i;
  const onlyNumbers = /^(.*\d){6,15}$/;

  if (!email || !password || !username) {
    res.status(400).json({
      msj: 'Incorrect new user',
      content: []
    });
    return false;
  }

  if (!regExEmail.test(email)) {
    res.status(400).json({
      msj: 'Incorrect email',
      content: []
    });
    return false;
  }

  if (!onlyNumbers.test(password) || typeof password !== 'string') {
    res.status(400).json({
      msj: 'Incorrect password',
      content: []
    });
    return false;
  }

  if (username.length < 4) {
    res.status(400).json({
      msj: 'Incorrect username',
      content: []
    });
    return false;
  }
  return true;
}

exports.isNewProjectValid = (newProject, res) => {

  const { name, members, description } = newProject;

  if (!name || !members) {
    res.status(400).json({
      msj: 'Incorrect new project',
      content: []
    });
    return false;
  }

  if (!this.isNameValid(name, res)) return false;

  if (description && !this.isDescriptionValid(description, res)) return false;

  if (!this.isArrayOfObjIdValid(members)) {
    res.status(400).json({
      msj: 'Project members id invalid',
      content: []
    });
    return false;
  }
  return true;
}

exports.isNewEpicValid = (newEpic, res) => {

  const { id, project, name, description } = newEpic;

  if (!id || !name || !project) {
    res.status(400).json({
      msj: 'Incorrect new project',
      content: []
    });
    return false;
  }

  if (!this.isNameValid(name, res)) return false;
  if (description && !this.isDescriptionValid(description, res)) return false;
  if (!this.isObjectIdValid(project)) {
    res.status(400).json({
      msj: 'Project id invalid',
      content: []
    });
    return false;
  }
  return true;
}
