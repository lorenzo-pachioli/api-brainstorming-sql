
exports.passwordRemove = (users) => {
  if (Array.isArray(users)) {
    return users.map(user => {
      let newUser = ({ ...user }._doc);
      delete newUser.password
      return newUser;
    });
  }

  let newUser = ({ ...users }._doc);
  delete newUser.password;
  return newUser;
}