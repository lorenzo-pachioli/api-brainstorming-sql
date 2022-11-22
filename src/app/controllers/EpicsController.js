const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  NewEpicsService,
  AllEpicsService,
  EpicsServiceById,
  EpicsServiceByIdAllStories,
  EpicDeleteByIdService
} = require('../services/EpicsService');
const { isNewEpicValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewEpicsController = (token, newEpic, res) => {

  if (isTokenValid(token, res) && isNewEpicValid(newEpic, res)) {
    NewEpicsService(newEpic, res).catch(() => next(newError(`Couldn't save epic`, 500)));
  }
}

exports.AllEpicsController = (token, res) => {

  const userId = isTokenValid(token, res);
  userId && AllEpicsService(userId, res).catch(() => next(newError(`Couldn't get epic list`, 500)));
}

exports.EpicsControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && EpicsServiceById(id, res).catch(() => next(newError(`Couldn't get epic`, 500)));
}

exports.EpicsControllerByIdAllStories = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && EpicsServiceByIdAllStories(id, res).catch(() => next(newError(`Couldn't get story list for epic ${id}`, 500)));
}

exports.EpicDeleteByIdController = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && EpicDeleteByIdService(id, res).catch(() => next(newError(`Couldn't get task`, 500)));
}
