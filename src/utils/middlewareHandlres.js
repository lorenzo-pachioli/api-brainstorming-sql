
exports.queryForSelect = (obj) => {

  let result = '';
  const objLength = Object.keys(obj).length;

  for (let i = 1; i <= objLength; i++) {
    if (result.length === 0) {
      result = `${Object.keys(obj)[i - 1]} = ?`
    } else {
      result = `${result} and ${Object.keys(obj)[i - 1]} = ?`
    }
  }

  return result;
}

exports.valuesArray = (obj) => {

  let result = [];
  const objLength = Object.keys(obj).length;

  for (let i = 1; i <= objLength; i++) {
    result.push(obj[Object.keys(obj)[i - 1]]);
  }

  return result;
}

exports.queryForUpdate = (obj) => {

  let result = '';
  const objLength = Object.keys(obj).length;

  for (let i = 1; i <= objLength; i++) {
    if (result.length === 0) {
      result = `${Object.keys(obj)[i - 1]} = ?`
    } else {
      result = `${result}, ${Object.keys(obj)[i - 1]} = ?`
    }
    /* console.log('number', i, Object.keys(obj)[i - 1], result); */
  }

  return result;
}

exports.queryForCreate = (obj) => {

  let result = '';
  const objLength = Object.keys(obj).length;

  for (let i = 1; i <= objLength; i++) {
    if (result.length === 0) {
      result = `${Object.keys(obj)[i - 1]}`
    } else {
      result = `${result}, ${Object.keys(obj)[i - 1]}`
    }
  }

  return result;
}
