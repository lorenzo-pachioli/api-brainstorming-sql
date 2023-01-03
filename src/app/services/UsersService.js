const UsersBrainstorming = require('../models/UsersModel');
const { createUsers } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');
const { remover } = require('../../utils/remover');
const User = require('../middlewares/UserMiddlewares');
const user = new User;

exports.NewUsersService = async (newUser, res) => {

  const result = await user.findOne({ email: newUser.email });
  if (result.length > 0) return response(`Email '${newUser.email}' already exist`, res, 200, {});

  user.save(newUser, (err, result) => {
    if (err) return response(`User created failed`, res, 200, err);
    return response(`User created succesfully`, res, 200, result);
  });
}

exports.AllUsersService = async (res) => {

  const userList = await user.findAll();
  if (userList.length > 0) {
    const userListWithoutPass = remover(userList, 'password');
    return response(`User list`, res, 200, userListWithoutPass);
  }

  return response(`User list is empty`, res, 200);
}

exports.UsersServiceById = async (_id, res) => {

  const alreadyExist = await user.findById(_id);

  if (alreadyExist.length > 0) {
    const userWithoutPassword = remover(alreadyExist[0], 'password');
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

exports.UserDeleteByIdService = async (id, res) => {

  user.deleteOne(id, (err, result) => {
    if (err) return response(`Delete user ${id} failed`, res, 200, {});
    if (result.affectedRows === 0) return response(`User ${id} doesn't exist`, res, 200, {});
    return response(`User ${id} deleted succesfully`, res, 200, {});
  });
}
