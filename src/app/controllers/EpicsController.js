const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { NewEpicsService, AllEpicsService, EpicsServiceById, EpicsServiceByIdAllStories } = require('../services/EpicsService');
const { isNewEpicValid } = require('../../utils/newItemsValidator');

exports.NewEpicsController = (token, newEpic, res) => {

  if (
    isIdAndTokenValid(newEpic.id, token, res) &&
    isNewEpicValid(newEpic, res)) {
    NewEpicsService(newEpic, res);
  }

}

exports.AllEpicsController = (token, res) => {

  isTokenValid(token, res) && AllEpicsService(res);
}

exports.EpicsControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && EpicsServiceById(id, res);
}

exports.EpicsControllerByIdAllStories = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && EpicsServiceByIdAllStories(id, res);
}
