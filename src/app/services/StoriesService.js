const Stories = require('../models/StoriesModel');
const Tasks = require('../models/TasksModel');
const { createStories } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');
const Epics = require('../models/EpicsModel');
const Projects = require('../models/ProjectsModel');

exports.NewStoriesService = async (newStory, res) => {

  const lastStory = await Stories.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = lastStory ? lastStory.id + 1 : 1;
  const story = createStories(newMaxId, newStory);
  story.save();

  return response(`Story created succesfully`, res, 200, story);
}

exports.AllStoriesService = async (userId, res) => {

  const projects = await Projects.find({ members: { $in: [userId] } });
  const ids = projects.map(p => `${p._id}`);
  const epicList = await Epics.find({ project: { $in: ids } });
  const epicsIds = epicList.map(e => `${e._id}`);
  const storiesList = await Stories.find({ epic: { $in: epicsIds } });
  return response(`Stories list`, res, 200, storiesList);
}

exports.StoriesServiceById = async (id, res) => {

  const storyById = await Stories.findOne({ id: id });
  if (storyById) return response(`Story ${id}`, res, 200, storyById);

  return response(`Story ${id} doesn't exist`, res, 200, {});
}

exports.StoriesServiceByIdAllTasks = async (id, res) => {

  const storyById = await Stories.findOne({ id: id });
  if (!storyById) return response(`Story ${id} doesn't exist`, res, 200);

  const taskList = await Tasks.find({ story: storyById._id });
  if (taskList.length > 0) return response(`There're no tasks for story ${id}`, res, 200, taskList);

  return response(`Tasks for story ${id}`, res, 200);
}

exports.StoryDeleteByIdService = async (id, res) => {
  const story = await Stories.findOne({ id: id });
  const task = await Tasks.deleteMany({ story: `${story._id}` });
  const storyById = await Stories.deleteOne({ id: id });
  if (storyById.deletedCount > 0) return response(`Story ${id}`, res, 200, story);

  return response(`Story ${id} doesn't exist`, res, 200, {});
}