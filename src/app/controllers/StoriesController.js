const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { StoriesService, StoriesServiceById, StoriesServiceByIdAllTasks } = require('../services/StoriesService');

exports.StoriesController = (token, res) => {

  isTokenValid(token, res) && StoriesService(res);
}

exports.StoriesControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && StoriesServiceById(id, res);
}

exports.StoriesControllerByIdAllTasks = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && StoriesServiceByIdAllTasks(id, res);
}
