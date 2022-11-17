const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { NewEpicsService, AllEpicsService, EpicsServiceById, EpicsServiceByIdAllStories } = require('../services/EpicsService');
const { isNewEpicValid } = require('../helpers/newItemsValidator');

exports.NewEpicsController = (token, newEpic) => {

  if (
    isTokenValid(token) &&
    isNewEpicValid(newEpic)) {
    NewEpicsService(newEpic);
  }

}

exports.AllEpicsController = (token) => {

  isTokenValid(token) && AllEpicsService();
}

exports.EpicsControllerById = (token, id) => {

  isIdAndTokenValid(id, token) && EpicsServiceById(id);
}

exports.EpicsControllerByIdAllStories = (token, id) => {

  isIdAndTokenValid(id, token) && EpicsServiceByIdAllStories(id);
}
