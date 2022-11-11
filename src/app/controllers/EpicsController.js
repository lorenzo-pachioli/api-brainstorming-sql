const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { EpicsService, EpicsServiceById, EpicsServiceByIdAllStories } = require('../services/EpicsService');


exports.EpicsController = (token, res) => {

  isTokenValid(token, res) && EpicsService(res);
}

exports.EpicsControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && EpicsServiceById(id, res);
}

exports.EpicsControllerByIdAllStories = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && EpicsServiceByIdAllStories(id, res);
}
