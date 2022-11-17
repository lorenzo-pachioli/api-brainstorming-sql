let globalRes;

exports.response = (msj, code, content = []) => {
  globalRes.status(code).json({
    msj,
    content
  });
  return false;
}

exports.setRes = (newRes) => {
  globalRes = newRes;
}
