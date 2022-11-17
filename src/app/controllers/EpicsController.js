const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { NewEpicsService, AllEpicsService, EpicsServiceById, EpicsServiceByIdAllStories } = require('../services/EpicsService');
const { isNewEpicValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewEpicsController = (token, newEpic) => {

  if (
    isTokenValid(token) &&
    isNewEpicValid(newEpic)) {
    NewEpicsService(newEpic).catch(() => next(newError(`Couldn't save epic`, 500)));
  }
}

exports.AllEpicsController = (token) => {

  isTokenValid(token) && AllEpicsService().catch(() => next(newError(`Couldn't get epic list`, 500)));
}

exports.EpicsControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && EpicsServiceById(id).catch(() => next(newError(`Couldn't get epic`, 500)));
}

exports.EpicsControllerByIdAllStories = (token, id) => {

  isIdAndTokenValid(id, token) && EpicsServiceByIdAllStories(id).catch(() => next(newError(`Couldn't get story list for epic ${id}`, 500)));
}
