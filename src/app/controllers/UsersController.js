const {
  NewUsersService,
  AllUsersService,
  UsersServiceById,
  ModifyUsersService,
  UserDeleteByIdService
} = require('../services/UsersService');
const { newError } = require('../../utils/errorModeling');
const { response, serviceReturn } = require('../../utils/response');

exports.NewUsersController = async (req, res, next) => {
  try {
    const newUser = req.body;
    const userSaved = await NewUsersService(newUser);
    return response(userSaved.msg, res, 200, userSaved.content);
  } catch (err) {
    return next(newError(`Couldn't create new user`, 500))
  }
}

exports.AllUsersController = async (req, res, next) => {
  try {
    const userList = await AllUsersService();
    return response(userList.msg, res, 200, userList.content);
  } catch (err) {
    return next(newError(`Couldn't get users list`, 500))
  }
}

exports.UsersControllerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await UsersServiceById(id);
    return response(userById.msg, res, 200, userById.content);
  } catch (err) {
    return next(newError(`Couldn't get user`, 500))
  }
}

exports.ModifyUserController = async (req, res, next) => {
  try {
    const newUser = req.body;
    const userExist = await UsersServiceById(newUser.id, true);
    if (!userExist.status) return response(userExist.msg, res, 200, {});
    if (userExist.content.password !== newUser.password) return response(`Incorrect user password`, res, 200, {});
    const userModifyed = await ModifyUsersService(newUser);
    return response(userModifyed.msg, res, 200, userModifyed.content);
  } catch (err) {
    return next(newError(`Couldn't update user`, 500))
  }
}

exports.UserDeleteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userExist = await UsersServiceById(id);
    if (!userExist.status) return response(userExist.msg, res, 200, {});
    const userDelted = await UserDeleteByIdService(id);
    if (!userDelted.status) return response(userDelted.msg, res, 200, {});
    return response(userDelted.msg, res, 200, userExist.content);
  } catch (err) {
    return next(newError(`Couldn't delete user`, 500))
  }
}
