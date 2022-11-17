const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  NewUsersService,
  AllUsersService,
  UsersServiceById
} = require('../services/UsersService');
const { isNewUserValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewUsersController = (token, newUser) => {

  if (isTokenValid(token) && isNewUserValid(newUser)) {
    NewUsersService(newUser).catch(() => next(newError(`Couldn't create new user`, 500)));
  }
}

exports.AllUsersController = (token) => {

  isTokenValid(token) && AllUsersService().catch(() => next(newError(`Couldn't get users list`, 500)));
}

exports.UsersControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && UsersServiceById(id).catch(() => next(newError(`Couldn't get user ${id}`, 500)));
}
