const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  AllStoriesService,
  NewStoriesService,
  StoriesServiceById,
  StoriesServiceByIdAllTasks
} = require('../services/StoriesService');
const { isNewStoryValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewStoriesController = (token, newStory) => {

  if (isTokenValid(token) && isNewStoryValid(newStory)) {
    NewStoriesService(newStory).catch(() => next(newError(`Couldn't save story`, 500)));
  }
}

exports.AllStoriesController = (token) => {

  isTokenValid(token) && AllStoriesService().catch(() => next(newError(`Couldn't get stories list`, 500)));
}

exports.StoriesControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && StoriesServiceById(id).catch(() => next(newError(`Couldn't get story`, 500)));
}

exports.StoriesControllerByIdAllTasks = (token, id) => {

  isIdAndTokenValid(id, token) && StoriesServiceByIdAllTasks(id).catch(() => next(newError(`Couldn't get tasks list for story ${id}`, 500)));
}
