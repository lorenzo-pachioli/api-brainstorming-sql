let globalRes;
let globalNext;

exports.response = (msj, code, content = []) => {
  globalRes.status(code).json({
    success: code === 200 ? true : false,
    message: msj,
    data: content
  });
  return false;
}

exports.logInResponse = (msj, code, token = '', user = {}) => {
  globalRes.status(code).json({
    success: code === 200 ? true : false,
    message: msj,
    token,
    user
  });
  return false;
}

exports.next = (msj) => {
  return globalNext(msj);
}

exports.setRes = (newRes) => {
  globalRes = newRes;
}

exports.setNext = (newNext) => {
  globalNext = newNext;
}

exports.returnError = (err, req, res) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    data: []
  });
}
