const Epics = require('../models/EpicsModel');
const Stories = require('../models/StoriesModel');
const Projects = require('../models/ProjectsModel');
const { createEpics } = require('../../utils/modelCreators');
const { response } = require('../../utils/response');

exports.NewEpicsService = async (newEpic, res) => {

  try {
    const epicAlreadyExist = await Epics.findOne({ id: newEpic.id });
    const epicHasProject = await Projects.findById(newEpic.project);

    if (epicAlreadyExist) return response(`Epic with id ${newEpic.id} already exist`, 200, res, epicAlreadyExist);
    if (!epicHasProject) return response(`The project you're assigning the epic doesn't exist`, 200, res);

    const epic = createEpics(newEpic);
    epic.save();
    return response(`Epic created succesfully`, 200, res, epic);

  } catch (err) {
    console.log(err);
    return response(`Couldn't save epic`, 503, res);
  }
}

exports.AllEpicsService = async (res) => {

  try {
    const epics = await Epics.find();

    return response(`Epic list`, 200, res, epics);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get epic list`, 503, res);
  }
}

exports.EpicsServiceById = async (id, res) => {

  try {
    const epicById = await Epics.findOne({ id: id });
    if (epicById) return response(`Epic ${id}`, 200, res, epicById);

    return response(`Epic ${id} doesn't exist`, 200, res, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't get epic`, 503, res);
  }
}

exports.EpicsServiceByIdAllStories = async (id, res) => {

  try {
    const epicId = await Epics.findOne({ id: id });
    if (!epicId) return response(`Epic ${id} doesn't exist`, 200, res);

    const storiesList = await Stories.find({ epic: epicId });
    if (storiesList.length > 0) return response(`Stories for epic ${id}`, 200, res, storiesList);

    return response(`There're no stories for epic ${id}`, 200, res);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get story list for epic ${id}`, 503, res);
  }
}
