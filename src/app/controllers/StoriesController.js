const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { AllStoriesService, NewStoriesService, StoriesServiceById, StoriesServiceByIdAllTasks } = require('../services/StoriesService');
const { isNewStoryValid } = require('../helpers/newItemsValidator');

exports.NewStoriesController = (token, newStory, res) => {

  if (isIdAndTokenValid(newStory.id, token, res) && isNewStoryValid(newStory, res)) {
    NewStoriesService(newStory, res);
  }
}

exports.AllStoriesController = (token, res) => {

  isTokenValid(token, res) && AllStoriesService(res);
}

exports.StoriesControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && StoriesServiceById(id, res);
}

exports.StoriesControllerByIdAllTasks = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && StoriesServiceByIdAllTasks(id, res);
}
