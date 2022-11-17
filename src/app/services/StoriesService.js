const Stories = require('../models/StoriesModel');
const Tasks = require('../models/TasksModel');
const { createStories } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewStoriesService = async (newStory) => {

  const storyAlreadyExist = await Stories.findOne({ name: newStory.name });
  if (storyAlreadyExist) return response(`Story with name '${newStory.name}' already exist`, 200, {});

  const epicsList = await Stories.find();
  const newMaxId = epicsList.length + 1;
  const story = createStories(newMaxId, newStory);
  story.save();

  return response(`Story created succesfully`, 200, story);
}

exports.AllStoriesService = async () => {

  const storiesList = await Stories.find();

  return response(`Stories list`, 200, storiesList);
}

exports.StoriesServiceById = async (id) => {

  const storyById = await Stories.findOne({ id: id });
  if (storyById) return response(`Story ${id}`, 200, storyById);

  return response(`Story ${id} doesn't exist`, 200, {});
}

exports.StoriesServiceByIdAllTasks = async (id) => {

  const storyById = await Stories.findOne({ id: id });
  if (!storyById) return response(`Story ${id} doesn't exist`, 200);

  const taskList = await Tasks.find({ story: storyById._id });
  if (taskList.length > 0) return response(`There're no tasks for story ${id}`, 200, taskList);

  return response(`Tasks for story ${id}`, 200);
}
