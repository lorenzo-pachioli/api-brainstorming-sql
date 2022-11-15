const ObjectId = require('mongoose').Types.ObjectId;

exports.isNameValid = (name, res) => {

  if (!name || name.length < 4) {
    res.status(400).json({
      msj: 'Incorrect name'
    });
    return false;
  }
  return true;
}

exports.isDescriptionValid = (description, res) => {

  if (description && description.length < 10) {
    res.status(400).json({
      msj: 'Incorrect description'
    });
    return false;
  }
  return true;
}

exports.isObjectIdValid = (id) => {

  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
}

exports.isArrayOfObjIdValid = (array) => {

  if (array.length === 0) {
    return false;
  }

  return !array.some(objectId => {
    return !this.isObjectIdValid(objectId);
  });
}
