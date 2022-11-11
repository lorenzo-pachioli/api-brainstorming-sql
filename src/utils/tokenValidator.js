const jwt = require('jsonwebtoken');

exports.tokenValidator = (token) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return true;
    } else {
      // Access Denied
      return false;
    }
  } catch (error) {
    // Access Denied
    return false;
  }
}