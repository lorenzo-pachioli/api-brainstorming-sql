const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { NewUsersService, AllUsersService, UsersServiceById } = require('../services/UsersService');
const { isNewUserValid } = require('../helpers/newItemsValidator');

exports.NewUsersController = (token, newUser) => {

  if (isTokenValid(token) && isNewUserValid(newUser)) {
    NewUsersService(newUser);
  }
}

exports.AllUsersController = (token) => {

  isTokenValid(token) && AllUsersService();
}

exports.UsersControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && UsersServiceById(id);
}
