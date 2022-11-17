const Epics = require('../models/EpicsModel');
const Stories = require('../models/StoriesModel');
const Projects = require('../models/ProjectsModel');
const { createEpics } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewEpicsService = async (newEpic) => {

  try {
    const epicAlreadyExist = await Epics.findOne({ name: newEpic.name });
    const epicHasProject = await Projects.findById(newEpic.project);

    if (epicAlreadyExist) return response(`Epic with name '${newEpic.name}' already exist`, 200, {});
    if (!epicHasProject) return response(`The project you're assigning the epic doesn't exist`, 200);

    const epicsList = await Epics.find();
    const newMaxId = epicsList.length + 1;
    const epic = createEpics(newMaxId, newEpic);
    epic.save();
    return response(`Epic created succesfully`, 200, epic);

  } catch (err) {
    console.log(err);
    return response(`Couldn't save epic`, 503);
  }
}

exports.AllEpicsService = async () => {

  try {
    const epics = await Epics.find();

    return response(`Epic list`, 200, epics);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get epic list`, 503);
  }
}

exports.EpicsServiceById = async (id) => {

  try {
    const epicById = await Epics.findOne({ id: id });
    if (epicById) return response(`Epic ${id}`, 200, epicById);

    return response(`Epic ${id} doesn't exist`, 200, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't get epic`, 503);
  }
}

exports.EpicsServiceByIdAllStories = async (id) => {

  try {
    const epicId = await Epics.findOne({ id: id });
    if (!epicId) return response(`Epic ${id} doesn't exist`, 200);

    const storiesList = await Stories.find({ epic: epicId });
    if (storiesList.length > 0) return response(`Stories for epic ${id}`, 200, storiesList);

    return response(`There're no stories for epic ${id}`, 200);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get story list for epic ${id}`, 503);
  }
}
