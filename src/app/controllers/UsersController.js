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
const { isObjectIdValid } = require('../../utils/inputsValidator');

exports.NewUsersController = (newUser, res) => {

  /* if (isNewUserValid(newUser, res)) {
    NewUsersService(newUser, res).catch(() => next(newError(`Couldn't create new user`, 500)));
  } */
  NewUsersService(newUser, res)
}

exports.AllUsersController = (token, res) => {

  isTokenValid(token, res) && AllUsersService(res).catch(() => next(newError(`Couldn't get users list`, 500)));
}

exports.UsersControllerById = (token, _id, res) => {

  if (isTokenValid(token, res) && isObjectIdValid(_id)) {
    UsersServiceById(_id, res).catch(() => next(newError(`Couldn't get user ${_id}`, 500)));
  } else {
    next(newError(`_id: ${_id} is not valid`, 500));
  }
}

exports.ModifyUserController = (token, newUser, res) => {

  if (isIdAndTokenValid(newUser.id, token, res) && isNewUserValid(newUser, res)) {
    ModifyUsersService(newUser, res).catch(() => next(newError(`Couldn't update user`, 500)));
  }
}

exports.UserDeleteByIdController = (token, _id, res) => {

  if (isTokenValid(token, res) && isObjectIdValid(_id)) {
    UserDeleteByIdService(_id, res).catch(() => next(newError(`Couldn't delete user ${_id}`, 500)));
  } else {
    next(newError(`_id: ${_id} is not valid`, 500));
  }
}
