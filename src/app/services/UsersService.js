const UsersBrainstorming = require('../models/UsersModel');
const { createUsers } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');
const { remover } = require('../../utils/remover');

exports.NewUsersService = async (newUser, res) => {

  const userAlreadyExist = await UsersBrainstorming.findOne({ username: newUser.username });
  if (userAlreadyExist) return response(`Username '${newUser.username}' already exist`, res, 200, {});

  const userList = await UsersBrainstorming.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = userList.id + 1;
  const user = createUsers(newMaxId, newUser);
  user.save();

  return response(`User created succesfully`, res, 200, user);
}

exports.AllUsersService = async (res) => {

  const userList = await UsersBrainstorming.find();
  if (userList.length > 0) {
    const userListWithoutPass = remover(userList, 'password');
    return response(`User list`, res, 200, userListWithoutPass);
  }

  return response(`User list is empty`, res, 200);
}

exports.UsersServiceById = async (_id, res) => {

  const user = await UsersBrainstorming.findOne({ _id });

  if (user) {
    const userWithoutPassword = remover(user, 'password');
    return response(`User ${_id}`, res, 200, userWithoutPassword);
  }

  return response(`User ${_id} doesn't exist`, res, 200, {});
}

exports.ModifyUsersService = async (newUser, res) => {

  const user = await UsersBrainstorming.findOne({ id: newUser.id });
  if (user.password !== newUser.password) return response(`Incorrect user password`, res, 200, {});

  const userUpdated = await UsersBrainstorming.findOneAndUpdate({ _id: newUser._id }, newUser, { new: true });

  if (userUpdated) {
    const userUpdatedNoPass = remover(userUpdated);
    return response(`User ${newUser.id} updated`, res, 200, userUpdatedNoPass);
  }

  return response(`Couldn't update user`, res, 200, {});
}

exports.UserDeleteByIdService = async (_id, res) => {

  const user = await UsersBrainstorming.findOne({ _id });
  const userById = await UsersBrainstorming.deleteOne({ _id });
  if (userById.deletedCount > 0) return response(`user ${_id}`, res, 200, user);

  return response(`user ${_id} doesn't exist`, res, 200, {});
}
