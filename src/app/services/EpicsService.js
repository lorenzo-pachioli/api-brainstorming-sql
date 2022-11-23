const Epics = require('../models/EpicsModel');
const Stories = require('../models/StoriesModel');
const Projects = require('../models/ProjectsModel');
const { createEpics } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewEpicsService = async (newEpic, res) => {

  const epicHasProject = await Projects.findById(newEpic.project);
  if (!epicHasProject) return response(`The project you're assigning the epic doesn't exist`, res, 200);

  const lastEpic = await Epics.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = lastEpic ? lastEpic.id + 1 : 1;
  const epic = createEpics(newMaxId, newEpic);
  epic.save();

  return response(`Epic created succesfully`, res, 200, epic);
}

exports.AllEpicsService = async (userId, res) => {

  const projects = await Projects.find({ members: [userId] });
  const ids = projects.map(p => `${p._id}`);
  const epicList = await Epics.find({ project: { $in: ids } });

  return response(`Epic list`, res, 200, epicList);
}

exports.EpicsServiceById = async (id, res) => {

  const epicById = await Epics.findOne({ id: id });
  if (epicById) return response(`Epic ${id}`, res, 200, epicById);

  return response(`Epic ${id} doesn't exist`, res, 200, {});
}

exports.EpicsServiceByIdAllStories = async (id, res) => {

  const epicId = await Epics.findOne({ id: id });
  if (!epicId) return response(`Epic ${id} doesn't exist`, res, 200);

  const storiesList = await Stories.find({ epic: epicId });
  if (storiesList.length > 0) return response(`Stories for epic ${id}`, res, 200, storiesList);

  return response(`There're no stories for epic ${id}`, res, 200);
}

exports.EpicDeleteByIdService = async (id, res) => {

  const epic = await Epics.findOne({ id: id });
  const epicById = await Epics.deleteOne({ id: id });
  if (epicById.deletedCount > 0) return response(`Epic ${id}`, res, 200, epic);

  return response(`Epic ${id} doesn't exist`, res, 200, {});
}