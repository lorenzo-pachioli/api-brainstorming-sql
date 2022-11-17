const Stories = require('../models/StoriesModel');
const Tasks = require('../models/TasksModel');
const { createStories } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewStoriesService = async (newStory) => {

  try {
    const storyAlreadyExist = await Stories.findOne({ name: newStory.name });
    if (storyAlreadyExist) return response(`Story with name '${newStory.name}' already exist`, 200, {});

    const epicsList = await Stories.find();
    const newMaxId = epicsList.length + 1;
    const story = createStories(newMaxId, newStory);
    story.save();

    return response(`Story created succesfully`, 200, story);

  } catch (err) {
    console.log(err);
    return response(`Couldn't save story`, 503);
  }
}

exports.AllStoriesService = async () => {

  try {
    const storiesList = await Stories.find();

    return response(`Stories list`, 200, storiesList);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get stories list`, 503);
  }
}

exports.StoriesServiceById = async (id) => {

  try {
    const storyById = await Stories.findOne({ id: id });
    if (storyById) return response(`Story ${id}`, 200, storyById);

    return response(`Story ${id} doesn't exist`, 200, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't get story`, 503);
  }
}

exports.StoriesServiceByIdAllTasks = async (id) => {

  try {
    const storyById = await Stories.findOne({ id: id });
    if (!storyById) return response(`Story ${id} doesn't exist`, 200);

    const taskList = await Tasks.find({ story: storyById._id });
    if (taskList.length > 0) return response(`There're no tasks for story ${id}`, 200, taskList);

    return response(`Tasks for story ${id}`, 200);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get tasks list for story ${id}`, 503);
  }
}
