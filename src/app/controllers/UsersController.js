const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { UsersService, UsersServiceById } = require('../services/UsersService');

exports.UsersController = (token, res) => {

  isTokenValid(token, res) && UsersService(res);
}

exports.UsersControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && UsersServiceById(id, res);
}
