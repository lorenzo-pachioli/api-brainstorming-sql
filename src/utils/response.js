exports.response = (msj, code, res, content = []) => {
  res.status(code).json({
    msj,
    content
  });
  return false;
}