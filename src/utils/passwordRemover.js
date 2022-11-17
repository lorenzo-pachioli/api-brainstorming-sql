
exports.passwordRemove = (users) => {
  if (Array.isArray(users)) {
    return users.map(user => {
      return {
        _id: user._id,
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  }
  return {
    _id: users._id,
    id: users.id,
    email: users.email,
    username: users.username
  }
}