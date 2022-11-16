const Stories = require('../models/StoriesModel');
const Tasks = require('../models/TasksModel');
const { createStories } = require('../../utils/modelCreators');

exports.NewStoriesService = async (newStory, res) => {
  try {

    const storyAlreadyExist = await Stories.findOne({ id: newStory.id });

    if (storyAlreadyExist) {
      return res.status(200).json({
        msj: `Story already exist`,
        content: {}
      });
    }

    const story = createStories(newStory);
    story.save();
    res.status(200).json({
      msj: `Story created succesfully`,
      content: story
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json({
      msj: `Couldn't save story`,
      content: {}
    });
  }
}

exports.AllStoriesService = async (res) => {

  try {

    const storiesList = await Stories.find();

    res.status(200).json({
      msj: `Stories list`,
      content: storiesList
    });

  } catch (err) {
    console.log('error', err);
    res.status(400).json({
      msj: `Couldn't get stories list`,
      content: []
    });
  }
}

exports.StoriesServiceById = async (id, res) => {

  try {
    const storyById = await Stories.findOne({ id: id });

    if (storyById) {
      return res.status(200).json({
        msj: `Story ${id}`,
        content: storyById
      });
    }
    return res.status(200).json({
      msj: `Story ${id} doesn't exist`,
      content: {}
    });
  } catch (err) {
    res.status(400).json({
      msj: `Couldn't get story`,
      content: {}
    });
  }
}

exports.StoriesServiceByIdAllTasks = async (id, res) => {

  try {
    const storyById = await Stories.findOne({ id: id });

    if (!storyById) {
      return res.status(200).json({
        msj: `Story ${id} doesn't exist`,
        content: []
      });
    }

    const taskList = await Tasks.find({ story: storyById._id });
    if (taskList.length > 0) {
      return res.status(200).json({
        msj: `Tasks for story ${id}`,
        content: taskList
      });
    }

    return res.status(200).json({
      msj: `There're no tasks for story ${id}`,
      content: []
    });

  } catch (err) {
    res.status(400).json({
      msj: `Couldn't get tasks list for story ${id}`,
      content: []
    });
  }
}