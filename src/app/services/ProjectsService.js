
exports.ProjectService = (res) => {

  if (!tokenValidator(token)) {
    return res.status(401).json({
      msj: 'Unauthorized'
    });
  }

  res.status(200).json({
    msj: 'correct project'
  });
}

exports.ProjectServiceById = (id, res) => {

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
    msj: 'correct project'
  });
}

exports.ProjectServiceByIdAllEpics = (id, res) => {

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
    msj: 'correct project'
  });
}