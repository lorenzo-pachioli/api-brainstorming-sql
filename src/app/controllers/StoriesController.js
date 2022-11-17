const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { AllStoriesService, NewStoriesService, StoriesServiceById, StoriesServiceByIdAllTasks } = require('../services/StoriesService');
const { isNewStoryValid } = require('../helpers/newItemsValidator');

exports.NewStoriesController = (token, newStory) => {

  if (isTokenValid(token) && isNewStoryValid(newStory)) {
    NewStoriesService(newStory);
  }
}

exports.AllStoriesController = (token) => {

  isTokenValid(token) && AllStoriesService();
}

exports.StoriesControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && StoriesServiceById(id);
}

exports.StoriesControllerByIdAllTasks = (token, id) => {

  isIdAndTokenValid(id, token) && StoriesServiceByIdAllTasks(id);
}
