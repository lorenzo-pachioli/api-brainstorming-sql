const Epics = require('../models/EpicsModel');
const Stories = require('../models/StoriesModel');
const Projects = require('../models/ProjectsModel');
const { createEpics } = require('../../utils/modelCreators');

exports.NewEpicsService = async (newEpic, res) => {
  try {

    const epicAlreadyExist = await Epics.findOne({ id: newEpic.id });

    const epicHasProject = await Projects.findById(newEpic.project);
    console.log(epicAlreadyExist);
    if (epicAlreadyExist) {
      return res.status(200).json({
        msj: `Epic with id ${newEpic.id} already exist`,
        content: epicAlreadyExist
      });
    }

    if (!epicHasProject) {
      return res.status(200).json({
        msj: `The project you're assigning the epic doesn't exist`,
        content: []
      });
    }

    const epic = createEpics(newEpic);
    epic.save();
    res.status(200).json({
      msj: `Epic created succesfully`,
      content: epic
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      msj: `Couldn't save epic`,
      content: []
    });
  }
}

exports.AllEpicsService = async (res) => {

  try {
    const epics = await Epics.find();

    return res.status(200).json({
      msj: `Epic list`,
      content: epics
    });

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      msj: `Couldn't get epic list`,
      content: []
    });
  }
}

exports.EpicsServiceById = async (id, res) => {

  try {
    const epicById = await Epics.findOne({ id: id });

    if (epicById) {
      return res.status(200).json({
        msj: `Epic ${id}`,
        content: epicById
      });
    }
    return res.status(200).json({
      msj: `Epic ${id} doesn't exist`,
      content: {}
    });
  } catch (err) {
    res.status(400).json({
      msj: `Couldn't get epic`,
      content: {}
    });
  }
}

exports.EpicsServiceByIdAllStories = async (id, res) => {

  try {
    const epicId = await Epics.findOne({ id: id });

    if (!epicId) {
      return res.status(404).json({
        msj: `Epic ${id} doesn't exist`,
        content: []
      });
    }

    const storiesList = await Stories.find({ epic: epicId });
    if (storiesList.length > 0) {
      return res.status(200).json({
        msj: `Stories for epic ${id}`,
        content: storiesList
      });
    }

    return res.status(200).json({
      msj: `There're no stories for epic ${id}`,
      content: []
    });

  } catch (err) {
    res.status(400).json({
      msj: `Couldn't get story list for epic ${id}`,
      content: []
    });
  }
}
