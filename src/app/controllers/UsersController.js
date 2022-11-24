const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  NewUsersService,
  AllUsersService,
  UsersServiceById,
  ModifyUsersService,
  UserDeleteByIdService
} = require('../services/UsersService');
const { isNewUserValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewUsersController = (newUser, res) => {

  if (NewUserValid(newUser, res)) {
    NewUsersService(newUser, res).catch(() => next(newError(`Couldn't create new user`, 500)));
  }
}

exports.AllUsersController = (token, res) => {

  isTokenValid(token, res) && AllUsersService(res).catch(() => next(newError(`Couldn't get users list`, 500)));
}

exports.UsersControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && UsersServiceById(id, res).catch(() => next(newError(`Couldn't get user ${id}`, 500)));
}

exports.ModifyUserController = (token, newUser, res) => {

  if (isIdAndTokenValid(newUser.id, token, res) && isNewUserValid(newUser, res)) {
    ModifyUsersService(newUser, res).catch(() => next(newError(`Couldn't update user`, 500)));
  }
}

exports.UserDeleteByIdController = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && UserDeleteByIdService(id, res).catch(() => next(newError(`Couldn't delete user`, 500)));
}
