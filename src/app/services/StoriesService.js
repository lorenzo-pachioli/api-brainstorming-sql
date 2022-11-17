const Stories = require('../models/StoriesModel');
const Tasks = require('../models/TasksModel');
const { createStories } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewStoriesService = async (newStory, res) => {

  try {
    const storyAlreadyExist = await Stories.findOne({ name: newStory.name });
    if (storyAlreadyExist) return response(`Story with name '${newStory.name}' already exist`, 200, res, {});

    const epicsList = await Stories.find();
    const newMaxId = epicsList.length + 1;
    const story = createStories(newMaxId, newStory);
    story.save();

    return response(`Story created succesfully`, 200, res, story);

  } catch (err) {
    console.log(err);
    return response(`Couldn't save story`, 503, res);
  }
}

exports.AllStoriesService = async (res) => {

  try {
    const storiesList = await Stories.find();

    return response(`Stories list`, 200, res, storiesList);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get stories list`, 503, res);
  }
}

exports.StoriesServiceById = async (id, res) => {

  try {
    const storyById = await Stories.findOne({ id: id });
    if (storyById) return response(`Story ${id}`, 200, res, storyById);

    return response(`Story ${id} doesn't exist`, 200, res, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't get story`, 503, res);
  }
}

exports.StoriesServiceByIdAllTasks = async (id, res) => {

  try {
    const storyById = await Stories.findOne({ id: id });
    if (!storyById) return response(`Story ${id} doesn't exist`, 200, res);

    const taskList = await Tasks.find({ story: storyById._id });
    if (taskList.length > 0) return response(`There're no tasks for story ${id}`, 200, res, taskList);

    return response(`Tasks for story ${id}`, 200, res);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get tasks list for story ${id}`, 503, res);
  }
}
