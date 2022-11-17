let globalRes;
let globalNext;

exports.response = (msj, code, content = []) => {
  globalRes.status(code).json({
    msj,
    content
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
    msj: err.message,
    content: []
  });
}
