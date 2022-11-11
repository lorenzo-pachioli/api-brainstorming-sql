
exports.UsersService = (res) => {

  res.status(200).json({
    msj: 'correct users'
  });
}

exports.UsersServiceById = (id, res) => {

  res.status(200).json({
    msj: `correct users ${id}`
  });
}